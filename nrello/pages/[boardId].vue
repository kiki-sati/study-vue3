<template>
  <wrapperDefault v-if="data" :style="{
    backgroundImage: `url(${data.coverImage}`, // 배경 이미지 설정
    backgroundSize: 'cover',
    _backgroundPosition: 'center',
  }" class="h-screen">
    <template #actions>
      <UButton size="xs" @click="showListCreate = true">목록 추가</UButton>
    </template>
    <h1 class="text-3xl font-semibold mb-4 inline-block">{{ data.name }}</h1>

    <!-- 리스트 컨테이너 -->
    <ListContainer :board-id="(boardId as string)" :lists="data.lists" />

    <!-- 목록 생성/수정 슬라이드 오버 -->
    <USlideover v-model="showListCreate">
      <OverlayHeader :on-click="() => (showListCreate = false)" :title="selectedList ? '목록 수정' : '목록 생성'">
      </OverlayHeader>

      <div class="p-4">
        <!-- 목록 생성/수정 폼 -->
        <FormList :board-Id="(boardId as string)" :initial-data="selectedList" :on-create="handleCreate" :type="selectedList ? 'update' : 'create'"></FormList>
      </div>
    </USlideover>
  </wrapperDefault>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue';
import type { ListDocument } from "~/server/models/List";
import type { BoardDocument } from "~/server/models/Board";

definePageMeta({
  middleware: "auth",
});

const { boardId } = useRoute().params;

// 보드 데이터 가져오기
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

// 변경사항 발생 시 새로고침
provide("board-refresh", refresh);

const store = useStore();
const showListCreate = ref(false);
const selectedList = ref<ListDocument | undefined>(undefined);

watch(
  () => store.showListCreate,
  (newVal) => {
    console.log('watch store.showListCreate', newVal); // 디버깅용 로그
    showListCreate.value = newVal;
  }
);

watch(
  () => store.selectedList,
  (newVal) => {
    selectedList.value = newVal;
  }
);

// refreshBoardFlag 값이 변경될 때 보드를 새로고침
watch(
  () => store.refreshBoardFlag,
  () => {
    refresh();
  }
);

async function handleCreate() {
  refresh();
  store.showListCreate = false;
  await nextTick();
  showListCreate.value = false; // 강제로 슬라이드를 닫음
  console.log('showListCreate after nextTick:', showListCreate.value);
}
</script>
