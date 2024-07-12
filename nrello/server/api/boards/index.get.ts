import { Board } from "~/server/models/Board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  // DB에 해당 정보 불러오기
  return Board.find({
    owner: user._id,
  });
});
