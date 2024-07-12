<template>
  <WrapperDefault>
    <template #actions>
      <UButton size="xs" @click="showCreateBoard = true">Create board</UButton>
    </template>
    <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
      <BoardCard
        v-for="board in data"
        :key="board._id"
        :board="board"
        :onEdit="
          () => {
            selectedBoard = board;
            showCreateBoard = true;
          }
        "
      ></BoardCard>
    </div>

    <USlideover v-model="showCreateBoard">
      <OverlayHeader
        :on-click="() => (showCreateBoard = false)"
        :title="selectedBoard ? '보드 수정' : '보드 생성'"
      ></OverlayHeader>
      <div class="p-4">
        <FormBoard
          :initial-data="selectedBoard"
          :on-create="
            () => {
              refresh();
              showCreateBoard = false;
            }
          "
          :on-update="
            () => {
              refresh();
              showCreateBoard = false;
              selectedBoard = undefined;
            }
          "
          :type="selectedBoard ? 'update' : 'create'"
        ></FormBoard>
      </div>
    </USlideover>
  </WrapperDefault>
</template>

<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board.model";

definePageMeta({
  middleware: "auth",
});

const { data, refresh } = useFetch<BoardDocument>("/api/boards");
const showCreateBoard = ref(false);
const selectedBoard = ref<BoardDocument | undefined>();
</script>

<style scoped></style>
