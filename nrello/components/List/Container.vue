<template>
  <div>
    <!-- @sort : 이벤트 리스너 바인딩을 위해 사용. 순서가 변경된 것을 감지하면 handleSort를 호출한다-->
    <draggable
      :force-fallback="true"
      :list="lists"
      :scroll-sensitivity="500"
      class="flex gap-4 h-[80vh] overflow-x-auto pb-2"
      drag-class="dragging-board"
      ghost-class="ghost-board"
      handle=".list-handle"
      item-key="_id"
      @change="sortLists"
    >
      <template #item="{ element }">
        <div class="flex">
          <ListItem :board-id="boardId" :list="element"></ListItem>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import type { ListDocument } from "~/server/models/List";
import { useList } from "~/composables/useList";

interface Props {
  lists: ListDocument[];
  boardId: string;
}

const props = defineProps<Props>();

const { handleSort } = useList(props.boardId);

// handleSort 함수 정의
async function sortLists({ moved }: { moved: { element: ListDocument } }) {
  if (!moved) return;
  try {
    const lists = props.lists;
    await useList(props.boardId).handleSort(lists);
  } catch (e: any) {
    useToast().add({
      title: "오류",
      description: e.message || "문제가 발생하였습니다.",
    });
  }
}

</script>

<style scoped>
.ghost-board > div {
  @apply opacity-50;
}
.ghost-board > div > div {
  @apply invisible;
}

.dragging-board {
  @apply shadow-2xl transform rotate-2 cursor-grabbing;
}

.list .sortable-chosen {
  overflow: hidden;
  opacity: 1 !important;
}
</style>
