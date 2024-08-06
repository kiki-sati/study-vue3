<template>
  <WrapperDefault>
    <!-- Actions 슬롯을 활용하여 신규 보드 생성 버튼을 추가 -->
    <template #actions>
      <UButton size="xs" @click="showCreateBoard = true">신규 보드 생성</UButton>
    </template>
    <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- BoardCard 컴포넌트를 반복적으로 렌더링 -->
      <BoardCard v-for="board in data" :key="board._id" :board="board" :onEdit="() => {
          selectedBoard = board;
          showCreateBoard = true;
        }
        "></BoardCard>
    </div>

    <!-- USlideover 컴포넌트를 통해 모달 형태로 보드 생성 또는 수정 기능을 구현 -->
    <USlideover v-model="showCreateBoard">
      <OverlayHeader :on-click="() => (showCreateBoard = false)" :title="selectedBoard ? '보드 수정' : '보드 생성'">
      </OverlayHeader>
      <div class="p-4">
        <!-- FormBoard 컴포넌트를 통해 보드 생성 및 수정에 대한 로직을 처리 -->
        <FormBoard :initial-data="selectedBoard" :on-create="() => {
            refresh();
            showCreateBoard = false;
          }
          " :on-update="() => {
              refresh();
              showCreateBoard = false;
              selectedBoard = undefined;
            }
            " :type="selectedBoard ? 'update' : 'create'"></FormBoard>
      </div>
    </USlideover>
  </WrapperDefault>
</template>

<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";

definePageMeta({
  middleware: "auth",
});

const { data, refresh } = useFetch<BoardDocument>("/api/boards");
// provide 함수를 사용하여 refresh-boards 키로 refresh 함수를 전달.
provide("refresh-boards", refresh);
const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();
</script>
