import { Validator } from "#nuxt-server-utils";
import BoardSchema from "~/schemas/Board.schema";
import { Board } from "~/server/models/Board";

export default defineEventHandler(async (event) => {
  // auth middlewate에 저장된 세션 정보 가져옴
  const user = event.context.user;

  if (!user || !user._id) {
    throw new Error("사용자가 인증되지 않았거나 사용자 ID를 찾을 수 없습니다.");
  }

  const body = await readBody(event);
  Validator.validateSchema(BoardSchema, body);

  return await Board.create({
    ...body,
    owner: user._id,
  });
});
