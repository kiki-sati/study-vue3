<template>
  <wrapperDefault v-if="data" :style="wrapperStyle" class="h-screen">
    <template #actions>
      <UButton size="xs" @click="openListCreate">목록 추가</UButton>
    </template>
    <h1 class="text-3xl font-semibold mb-4 inline-block">{{ data.name }}</h1>

    <!-- 리스트 컨테이너 -->
    <ListContainer :board-id="boardId" :lists="data.lists" />

    <!-- 목록 생성/수정 슬라이드 오버 -->
    <USlideover v-model="showListCreate">
      <OverlayHeader :on-click="closeListCreate" :title="selectedList ? '목록 수정' : '목록 생성'">
      </OverlayHeader>

      <div class="p-4">
        <!-- 목록 생성/수정 폼 -->
        <FormList :board-Id="boardId" :initial-data="selectedList as ListDocument | undefined" :on-create="handleCreate"
          :type="selectedList ? 'update' : 'create'"></FormList>
      </div>
    </USlideover>
  </wrapperDefault>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, computed } from 'vue';
import type { ListDocument } from "~/server/models/List";
import type { BoardDocument } from "~/server/models/Board";

// 페이지 메타데이터 정의 - 'auth' 미들웨어 사용
definePageMeta({
  middleware: "auth",
});

// URL 파라미터에서 boardId 추출
const { boardId } = useRoute().params as { boardId: string };

// 보드 데이터 가져오기 - boardId를 사용하여 API 요청
const { data, refresh } = await useFetch<BoardDocument>(
  `/api/boards/${boardId}`
);

// 데이터가 없을 경우 404 에러 발생
if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "보드를 찾을 수 없습니다.",
  });
}

// 변경사항 발생 시 새로고침을 위한 함수 제공
provide("board-refresh", refresh);

// 상태 관리 스토어 사용
const store = useStore();
const showListCreate = ref(false); // 목록 생성 슬라이드 상태
const selectedList = ref<ListDocument | undefined>(undefined); // 선택된 목록

// 배경 스타일 - 보드 커버 이미지를 배경으로 설정
const wrapperStyle = computed(() => ({
  backgroundImage: `url(${data.value?.coverImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

// 목록 생성 슬라이드 열기
function openListCreate() {
  store.showListCreate = true;
}

// 목록 생성 슬라이드 닫기
function closeListCreate() {
  store.showListCreate = false;
}

// store.showListCreate 상태를 감시하여 showListCreate 업데이트
watch(
  () => store.showListCreate,
  (state) => {
    showListCreate.value = state;
  }
);

// store.selectedList 상태를 감시하여 selectedList 업데이트
watch(
  () => store.selectedList,
  (state) => {
    selectedList.value = state;
  }
);

// store.refreshBoardFlag 상태를 감시하여 보드를 새로고침
watch(
  () => store.refreshBoardFlag,
  () => {
    refresh();
  }
);

// 목록 생성 후 보드를 새로고침하고 슬라이드를 닫음
async function handleCreate() {
  await refresh(); // 새로고침
  store.showListCreate = false; // 슬라이드 닫기 위한 상태 변경
  await nextTick(); // Vue의 반응형 상태가 DOM에 반영될 때까지 대기 -> DOM이 호출되고 나서 동작을 처리하기 위함(반응형의 상태가 업데이트 되고 DOM에 변경 사항이 반영 된 후에 다음 작업 수행 가능)
  showListCreate.value = false; // 강제로 슬라이드 닫기 위해 DOM 상태 변경
  console.log('showListCreate after nextTick:', showListCreate.value);
}
</script>