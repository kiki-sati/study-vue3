<template>
  <div>
    <draggable
      :force-fallback="true"
      :list="lists"
      :scroll-sensitivity="500"
      class="flex gap-4 h-[80vh] overflow-x-auto pb-2"
      drag-class="dragging-board"
      ghost-class="ghost-board"
      handle=".list-handle"
      item-key="_id"
      @sort="handleSort($event, lists)"
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
import type { ListDocument } from "~/server/models/List.model";
import { useList } from "~/composables/useList";

interface Props {
  lists: ListDocument[];
  boardId: string;
}

const props = defineProps<Props>();

const { handleSort } = useList(props.boardId);
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
