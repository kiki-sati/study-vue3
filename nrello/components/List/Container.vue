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
      @sort="handleSort"
    >
      <template #item="{ element }">
        <div class="flex">
          <div
            class="w-72 shadow flex-none bg-white dark:bg-gray-800 rounded-lg flex flex-col"
          >
            <!--          List Header-->
            <div
              class="p-2 border-b dark:border-gray-700 flex items-center justify-between list-handle"
            >
              <h3 class="font-medium">{{ element.name }}</h3>

              <UDropdown :items="listActions">
                <UIcon name="i-heroicons-cog-6-tooth"></UIcon>
              </UDropdown>
            </div>
            <!--          // List Header-->

            <!--          List Body-->
            <div class="list-body p-2 flex-1 overflow-y-hidden"></div>
            <!--          //List Body-->

            <!--          List Footer-->
            <div class="p-1 border-t dark:border-gray-700 felx items-center">
              <UButton block>카드 추가</UButton>
            </div>
            <!--          //List Footer-->
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import type { ListDocument } from "~/server/models/List.model";

interface Props {
  lists: ListDocument[];
  boardId: string;
}

const props = defineProps<Props>();
const listActions = ref([
  [
    {
      label: "카드추가",
      icon: "i-heroicons-plus-circle",
    },
  ],
  [
    {
      label: "삭제",
      icon: "i-heroicons-trash",
    },
  ],
]);

async function handleSort(e: any) {
  await useFetch(`/api/boards/${props.boardId}`, {
    method: "PUT",
    body: {
      lists: props.lists.flatMap((item) => item._id),
    },
    watch: false,
  });
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
