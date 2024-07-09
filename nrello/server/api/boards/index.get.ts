import Board from "~/components/Form/Board.vue";

export default defineEventHandler(async (event) => {
  const user = event.context.user;
  const boards = Board.find({
    owner: user._id,
  });
  return boards;
});
