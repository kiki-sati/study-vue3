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
        <FormList :board-Id="(boardId as string)" :initial-data="selectedList" :on-create="() => {
            refresh();
            showListCreate = false;
          }
          " :type="selectedList ? 'update' : 'create'"></FormList>
      </div>
    </USlideover>
  </wrapperDefault>
</template>

<script lang="ts" setup>
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

const selectedList = ref<ListDocument | undefined>();
const showListCreate = ref(false);
</script>
