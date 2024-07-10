import { Validator } from "#nuxt-server-utils";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user || !user._id) {
    throw new Error("사용자가 인증되지 않았거나 사용자 ID를 찾을 수 없습니다.");
  }

  const body = await readBody(event);
  Validator.validateSchema(BoardSchema.partial(), body);

  const boardId = getRouterParam(event, "boardId");
  const board = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: user._id,
    },
    {
      $set: body,
    }
  );

  return board;
});
