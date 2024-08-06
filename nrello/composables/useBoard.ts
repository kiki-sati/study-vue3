export const useBoard = () => {
  async function deleteBoard(boardId: string) {
    try {
      await useFetch(`/api/boards/${boardId}`, {
        method: "DELETE",
      });

      useToast().add({
        title: "보드 삭제",
      });
    } catch (e: any) {
      useToast().add({
        title: "오류",
        description: e.message || "문제가 발생하였습니다.",
      });
    }
  }

  return {
    deleteBoard: deleteBoard,
  };
};
