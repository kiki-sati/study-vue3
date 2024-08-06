import { List } from "~/server/models/List";
import {Board} from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  const boardId = getRouterParam(event, "boardId");
  const user = event.context.user;

  const deletedBoard = await Board.findOneAndDelete({
    _id: boardId,
    owner: user._id,
  });

  if (!deletedBoard) {
      throw createError({
        statusCode: 404,
        message: "Board not found",
      });
  }

  // 보드와 관련된 모든 목록 삭제
  await List.deleteMany({
    board: deletedBoard._id,
    owner: user._id,
  });

  event.node.res.statusCode = 204;

  return true;
});
