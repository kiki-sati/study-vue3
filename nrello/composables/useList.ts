import type { ListDocument } from "~/server/models/List";

// boardId 기준으로 사용자 목록을 관리하는 Hook
export const useList = (boardId: string) => {
  // 순서를 업데이트 하는 함수
  async function handleSort(lists: ListDocument[]) {
    await useFetch(`/api/boards/${boardId}`, {
      method: "PUT",
      body: {
        lists: lists.flatMap((item) => item._id),
      },
      watch: false,
    });
  }

  // 목록 삭제 함수
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

// 목록 수정 함수
  async function update(listId: string, data: Partial<ListDocument>) {
    try {
      await useFetch(`/api/lists/${listId}`, {
        method: "PUT",
        body: data,
        watch: false,
      });
    } catch (e: any) {
      handleError(e);
    }
  }

  function handleError(e: any) {
    useToast().add({
      title: "오류",
      description: e.message || "문제가 발생하였습니다."
    });
  }

  return {
    handleSort,
    destroy,
    update,
  };
};
