import type { CardDocument } from "~/server/models/Card";

export const useCard = () => {
  async function update(
    cardId: string,
    listId: string,
    data: Partial<CardDocument>
  ) {
    try {
      await useFetch(`/api/lists/${listId}/cards/${cardId}`, {
        method: "PUT",
        body: data,
        watch: false,
      });
    } catch (e: any) {
      useToast().add({
        title: "오류",
        description: e.message || "문제가 발생하였습니다.",
      });
    }
  }
  return {
    update,
  };
};
