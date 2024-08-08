import { UserDocument } from "~/server/models/User";
import { List } from "~/server/models/List";
import { Card } from "~/server/models/Card";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user as UserDocument;

  // list 에 아이디 기준으로 찾음
  // 추가로 리스에 포함된 카드도 같이 가져옴
  const list = await List.findOne({
    _id: listId,
    owner: user._id,
  }).populate({
    path: "cards",
    model: Card,
  });

  if (!list) {
    throw createError({
      statusCode: 404,
      message: "Card not found",
    });
  }

  return list?.cards;
});
