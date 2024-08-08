import { List } from "~/server/models/List";
import {Board} from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  //URL 매개변수에서 boardId 추출
  const boardId = getRouterParam(event, "boardId");
  const user = event.context.user; // 이벤트 컨텍스트에서 사용자 정보 가져오기

  // 보드 찾고 해당 보드 삭제
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

  // 성공
  event.node.res.statusCode = 204;

  return true;
});
