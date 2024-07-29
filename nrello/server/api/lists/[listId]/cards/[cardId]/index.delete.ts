import { UserDocument } from "~/server/models/User.model";
import { Card } from "~/server/models/Card.model";
import { List } from "~/server/models/List.model";

export default defineEventHandler(async (event) => {
  const cardId = getRouterParam(event, "cardId");
  const listId = getRouterParam(event, "listId");
  const user = event.context.user as UserDocument;

  const card = await Card.findOneAndDelete({
    _id: cardId,
    list: listId,
    owner: user._id,
  });

  if (!card) {
    throw createError({
      status: 404,
      message: "Card not found",
    });
  }

  await List.findOneAndUpdate(
    {
      _id: listId,
      owner: user._id,
    },
    {
      $pull: {
        cards: card._id,
      },
    }
  );

  event.node.res.statusCode = 204;

  return true;
});
