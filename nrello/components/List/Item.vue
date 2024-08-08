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
      @change="handleCardChange"
    >
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

// Props 인터페이스 정의
interface Props {
  list: ListDocument;
  boardId: string;
}

// Props 정의
const props = defineProps<Props>();

// 보드를 새로고침 함수 주입
const refreshBoard = inject("board-refresh") as () => void;

// 상태 관리를 위한 스토어 객체 선언
const store = useStore();

// 리스트 액션 정의 (수정, 카드 추가, 삭제)
const listActions = ref([
  [
    {
      label: "수정",
      icon: "i-heroicons-pencil",
      click: () => {
        // 리스트 수정 함수 호출
        store.handleListModify(props.list);
      }
    }
  ], [
    {
      label: "카드추가",
      icon: "i-heroicons-plus-circle",
      click: () => {
        // 카드 생성 모달 표시
        showCardCreate.value = true;
      }
    }
  ],
  [
    {
      label: "삭제",
      icon: "i-heroicons-trash",
      click: () => {
        // 리스트 삭제 및 보드 새로고침
        destroy(props.list._id);
        refreshBoard();
      }
    }
  ]
]);

// 리스트와 카드 관련 함수 가져오기
const { destroy, update: updateList } = useList(props.boardId);
const { update: updateCard } = useCard();

// 리스트의 카드 데이터 비동기 호출
const { data, refresh } = await useFetch<CardDocument[]>(
  `/api/lists/${props.list._id}/cards`
);

// 카드 생성 모달 상태
const showCardCreate = ref(false);

// 선택된 카드 상태
const selectedCard = ref<CardDocument | undefined>();

// 카드 업데이트 핸들러 함수
function handleCardUpdate(card: CardDocument) {
  // 선택된 카드 설정 및 카드 생성 모달 표시
  selectedCard.value = card;
  showCardCreate.value = true;
}

// 카드 변경 사항 핸들러 함수
async function handleCardChange(event: any) {
  try {
    if (event.added) {
      const { element: card } = event.added;
      // 카드
      await updateCard(card._id, props.list._id, {
        list: props.list._id
      });
      console.log("updateCard : ");
    }

    // 카드 이동시 list 수정
    await updateList(props.list._id, {
      cards: data.value?.flatMap((item) => item._id)
    });
    console.log("updateList : ");
  } catch (e) {
    console.error(e);
  }
}

// 카드 생성 모달 상태 변화 감지
watch(showCardCreate, (val) => {
  if (!val) {
    // 카드 생성 모달이 닫힐 때 선택된 카드 초기화
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


.sortable-chosen {
  opacity: 1 !important;
  cursor: grabbing;
}

</style>
