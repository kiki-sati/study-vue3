<template>
  <!-- 보드 컴포넌트 -->
  <div class="shadow dark:bg-gray-800 rounded-lg overflow-hidden relative">
    <!-- 커버 이미지가 있는 경우 -->
    <div v-if="board.coverImage" class="h-36 w-full relative z-[1]">
      <NuxtImg :alt="board.name" :src="board.coverImage" class="h-full w-full absolute object-cover z-[1]" />
      <!-- 그라데이션 레이어 -->
      <div class="absolute w-full h-full z-[2] bg-gradient-to-b from-black/90 to-transparent"></div>
    </div>

    <!-- 커버 이미지가 있는 경우에만 절대 위치 적용 -->
    <div :class="{ absolute: board.coverImage }" class="flex items-center gap-2 left-0 z-10 top-0 py-2 px-4">
      <!-- /pages/[boardId].vue 로 이동 -->
      <NuxtLink :to="{ name: 'boardId', params: { boardId: board._id } }" class="block font-semibold text-white">{{
        board.name }}</NuxtLink>
      <!-- 액션 드롭다운 -->
      <UDropdown :items="actions">
        <UIcon class="text-white" name="i-heroicons-cog-6-tooth"></UIcon>
      </UDropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";
import { useBoard } from "~/composables/useBoard";

interface Props {
  board: BoardDocument;
  onEdit?: (board: BoardDocument) => void;
}

const props = defineProps<Props>();

const refreshBoards = inject("refresh-boards") as () => void;

const { deleteBoard } = useBoard();

// 액션 항목 정의
const actions = ref([
  [
    {
      label: "수정",
      icon: "i-heroicons-pencil",
      // 수정 클릭 이벤트
      click: () => {
        props.onEdit?.(props.board);
      },
    },
  ],
  [
    {
      label: "삭제",
      icon: "i-heroicons-trash",
      // 삭제 클릭 이벤트
      click: async () => {
        await deleteBoard(props.board._id);
        refreshBoards();
      },
    },
  ],
]);
</script>
