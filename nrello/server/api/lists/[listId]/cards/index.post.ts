import { UserDocument } from "~/server/models/User";
import { Validator } from "#nuxt-server-utils";
import CardSchema from "~/schemas/Card.schema";
import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

export default defineEventHandler(async (event) => {
  const user = event.context.user as UserDocument;
  const listId = getRouterParam(event, "listId");

  const body = await readBody(event);

  Validator.validateSchema(CardSchema, body);

  const card = await Card.create({
    ...body,
    list: listId,
    owner: user._id,
  });

  await List.findOneAndUpdate(
    {
      _id: listId,
      owner: user._id,
    },
    {
      $push: {
        cards: card._id,
      },
    }
  );

  return card;
});
