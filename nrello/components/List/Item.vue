<template>
  <div class="w-72 shadow flex-none bg-white dark:bg-gray-800 rounded-lg flex flex-col">
    <div class="p-2 border-b dark:border-gray-700 flex items-center justify-between list-handle">
      <h3 class="font-medium">{{ list.name }}</h3>
      <UDropdown :items="listActions">
        <UIcon name="i-heroicons-cog-6-tooth"></UIcon>
      </UDropdown>
    </div>

    <!-- 드래그 가능한 카드 목록 -->
    <draggable v-if="data" :force-fallback="true" :list="data" :scroll-sensitivity="500"
               class="p-2 space-y-2 flex-1 overflow-y-hidden" ghost-class="ghost-card" group="list" item-key="_id"
               @change="handleCardChange">
      <template #item="{ element }">
        <ListCard :card="element" @click="() => handleCardUpdate(element)"></ListCard>
      </template>
    </draggable>
    <!-- 카드 추가 버튼 -->
    <div class="p-1 border-t dark:border-gray-700 flex items-center">
      <UButton block @click="showCardCreate = true">카드 추가</UButton>
    </div>

    <!-- 카드 수정&생성 모달 -->
    <!-- 특정 DOM 요소를 지정된 위치로 이동시키기 위하여 Teleport 사용-->
    <Teleport to="body">
      <UModal v-model="showCardCreate">
        <UCard>
          <OverlayHeader :on-click="() => (showCardCreate = false)" :title="selectedCard ? '카드 수정' : '카드 생성'">
          </OverlayHeader>
          <div class="p-2">
            <FormCard :initial-data="selectedCard" :list-id="props.list._id"
                      :on-create="() => { refresh(); showCardCreate = false; }"
                      :on-update="() => { refresh(); showCardCreate = false; selectedCard = undefined; }"
                      :type="selectedCard ? 'update' : 'create'"></FormCard>
          </div>
        </UCard>
      </UModal>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, watch } from 'vue';
import draggable from "vuedraggable";
import type { ListDocument } from "~/server/models/List";
import type { CardDocument } from "~/server/models/Card";
import { useCard } from "#imports";

interface Props {
  list: ListDocument;
  boardId: string;
}

const props = defineProps<Props>();
const refreshBoard = inject("board-refresh") as () => void;
const store = useStore();

const listActions = ref([
  [
    {
      label: "수정",
      icon: "i-heroicons-pencil",
      click: () => {
        store.handleListModify(props.list);
      }
    }
  ], [
    {
      label: "카드추가",
      icon: "i-heroicons-plus-circle",
      click: () => {
        showCardCreate.value = true;
      }
    }
  ],
  [
    {
      label: "삭제",
      icon: "i-heroicons-trash",
      click: () => {
        destroy(props.list._id);
        refreshBoard();
      }
    }
  ]
]);

const { destroy, update: updateList } = useList(props.boardId);
const { update: updateCard } = useCard();

const { data, refresh } = await useFetch<CardDocument[]>(
  `/api/lists/${props.list._id}/cards`
);
const showCardCreate = ref(false);
const selectedCard = ref<CardDocument | undefined>();

function handleCardUpdate(card: CardDocument) {
  selectedCard.value = card;
  showCardCreate.value = true;
}

async function handleCardChange(e: any) {
  try {
    if (e.added) {
      const { element: card } = e.added;
      await updateCard(card._id, props.list._id, {
        list: props.list._id
      });
    }

    await updateList(props.list._id, {
      cards: data.value?.flatMap((item) => item._id)
    });
  } catch (e) {
    console.error(e)
  }
}

watch(showCardCreate, (val) => {
  if (!val) {
    selectedCard.value = undefined;
  }
});
</script>

<style scoped>
.ghost-card {
  @apply bg-gray-100 rounded-lg;
}

.dark .ghost-card {
  @apply bg-gray-700;
}

.ghost-card > div {
  @apply invisible;
}

.dragging-card {
  @apply transform rotate-2 shadow-xl;
  cursor: grabbing !important;
}

.sortable-chosen {
  opacity: 1 !important;
  cursor: grabbing;
}

</style>
