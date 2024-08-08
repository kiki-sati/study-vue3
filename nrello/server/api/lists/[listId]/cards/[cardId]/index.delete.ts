import { UserDocument } from "~/server/models/User";
import { Card } from "~/server/models/Card";
import { List } from "~/server/models/List";

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
      statusCode: 404,
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
