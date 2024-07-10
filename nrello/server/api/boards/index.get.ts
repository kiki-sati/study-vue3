import { Board } from "~/server/models/Board.model";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  return Board.find({
    owner: user._id,
  });
});
