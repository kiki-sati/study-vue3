import { UserDocument } from "~/server/models/User";
import { List } from "~/server/models/List";
import { Board } from "~/server/models/Board";
import { Card } from "~/server/models/Card";

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, "listId");
  const user = event.context.user as UserDocument;

  const list = await List.findOneAndDelete({
    _id: listId,
    owner: user._id,
  });

  if (!list) {
    throw createError({
      status: 404,
      message: "Card not found",
    });
  }

  await Board.findOneAndUpdate(
    {
      _id: list.board,
      owner: user._id,
    },
    {
      $pull: {
        lists: list._id,
      },
    }
  );

  await Card.deleteMany({
    list: list._id,
    owner: user._id,
  });

  event.node.res.statusCode = 204;

  return true;
});
