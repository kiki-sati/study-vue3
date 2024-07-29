<template>
  <div
    class="w-72 shadow flex-none bg-white dark:bg-gray-800 rounded-lg flex flex-col"
  >
    <!--          List Header-->
    <div
      class="p-2 border-b dark:border-gray-700 flex items-center justify-between list-handle"
    >
      <h3 class="font-medium">{{ list.name }}</h3>

      <UDropdown :items="listActions">
        <UIcon name="i-heroicons-cog-6-tooth"></UIcon>
      </UDropdown>
    </div>
    <!--          // List Header-->

    <!--          List Body-->
    <div class="list-body p-2 flex-1 overflow-y-hidden">
      {{ data }}
    </div>
    <!--          //List Body-->

    <!--          List Footer-->
    <div class="p-1 border-t dark:border-gray-700 felx items-center">
      <UButton block>카드 추가</UButton>
    </div>
    <!--          //List Footer-->

    <Teleport to="body">
      <UModal v-model="showCardCreate">
        <UCard>
          <OverlayHeader
            :on-click="() => (showCardCreate = false)"
            :title="selectedCard ? '카드 수정' : '카드 생성'"
          ></OverlayHeader>
        </UCard>
      </UModal>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import type { ListDocument } from "~/server/models/List.model";
import type { CardDocument } from "~/server/models/Card.model";

interface Props {
  list: ListDocument;
  boardId: string;
}

const props = defineProps<Props>();
const refresh = inject("board-refresh") as () => void;

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
      click: () => {
        destroy(props.list._id);
        refresh();
      },
    },
  ],
]);

const { destroy } = useList(props.boardId);

const { data } = useFetch(`/api/lists/${props.list._id}/cards`);
const showCardCreate = ref(false);
const selectedCard = ref<CardDocument | undefined>();
</script>

<style scoped></style>
