import { UserDocument } from "~/server/models/User.model";
import { List } from "~/server/models/List.model";
import { Card } from "~/server/models/Card.model";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user as UserDocument;

  const list = await List.findOne({
    _id: listId,
    owner: user._id,
  }).populate({
    path: "cards",
    model: Card,
  });

  if (!list) {
    throw createError({
      status: 404,
      message: "Card not found",
    });
  }

  return list?.cards;
});
