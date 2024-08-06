import { Validator } from "#nuxt-server-utils";
import CardSchema from "~/schemas/Card.schema";
import { Card } from "~/server/models/Card";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.user;
  // const listId = getRouterParam(event, "listId");
  const cardId = getRouterParam(event, "cardId");

  Validator.validateSchema(CardSchema.partial(), body);

  const card = await Card.findOneAndUpdate(
    {
      _id: cardId,
      owner: user._id,
    },
    { ...body }
  );

  if (!card) {
    throw createError({
      status: 404,
      message: "Card not found",
    });
  }

  return card;
});
