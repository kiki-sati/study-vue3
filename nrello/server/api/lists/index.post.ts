import { List } from "~/server/models/List.model";
import { Board } from "~/server/models/Board.model";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // 유효성검증
  const user = event.context.user;

  const list = await List.create({
    ...body,
    owner: user._id,
  });

  if (!list) {
    throw createError({
      statusCode: 400,
      message: "문제가 발생했습니다.",
    });
  }

  await Board.findOneAndUpdate(
    {
      _id: body.board,
      owner: user._id,
    },
    {
      $push: { lists: list._id },
    },
    {
      new: true,
    }
  );
  return list;
});
