import type { ListDocument } from "~/server/models/List.model";

export const useList = (boardId: string) => {
  async function handleSort(e: any, lists: ListDocument[]) {
    await useFetch(`/api/boards/${boardId}`, {
      method: "PUT",
      body: {
        lists: lists.flatMap((item) => item._id),
      },
      watch: false,
    });
  }

  async function destroy(listId: string) {
    try {
      await useFetch(`/api/lists/${listId}`, {
        method: "DELETE",
      });

      useToast().add({
        title: "리스트 삭제 완료",
      });
    } catch (e: any) {
      useToast().add({
        title: "오류",
        description: e.message || "문제가 발생하였습니다.",
      });
    }
  }

  return {
    handleSort,
    destroy,
  };
};
