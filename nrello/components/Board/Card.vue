<template>
  <div class="shadow dark:bg-gray-800 rounded-lg overflow-hidden relative">
    <div v-if="board.coverImage" class="h-36 w-full relative z-[1]">
      <NuxtImg
        :alt="board.name"
        :src="board.coverImage"
        class="h-full w-full absolute object-cover z-[1]"
      />
      <div
        class="absolute w-full h-full z-[2] bg-gradient-to-b from-black/90 to-transparent"
      ></div>
    </div>

    <div
      :class="{
        absolute: board.coverImage,
      }"
      class="flex items-center gap-2 left-0 z-10 top-0 py-2 px-4"
    >
      <NuxtLink
        :to="{
          name: 'boardId',
          params: { boardId: board._id },
        }"
        class="block font-semibold text-white"
        >{{ board.name }}
      </NuxtLink>
      <UDropdown :items="actions">
        <UIcon class="text-white" name="i-heroicons-cog-6-tooth"></UIcon>
      </UDropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board.model"; // Board 문서 타입 가져오기
import { useBoard } from "~/composables/useBoard"; // useBoard 훅 가져오기

// Props 타입 정의
interface Props {
  board: BoardDocument; // 보드 객체
  onEdit?: (board: BoardDocument) => void; // 편집 콜백 (선택적)
}

const props = defineProps<Props>(); // Props 설정

// 참고 https://engineer-mole.tistory.com/393#google_vignette
//https://ko.vuejs.org/guide/components/provide-inject
const refreshBoards = inject("refresh-boards") as () => void; // 보드 목록 새로 고침 함수 주입

const { deleteBoard } = useBoard(); // 보드 삭제 함수 가져오기

// 드롭다운 메뉴 항목
const actions = ref([
  [
    {
      label: "Edit", // 편집 버튼
      icon: "i-heroicons-pencil", // 편집 아이콘
      click: () => {
        props.onEdit?.(props.board); // 편집 콜백 호출
      },
    },
  ],
  [
    {
      label: "Delete", // 삭제 버튼
      icon: "i-heroicons-trash", // 삭제 아이콘
      click: async () => {
        await deleteBoard(props.board._id); // 보드 삭제
        refreshBoards(); // 목록 새로 고침
      },
    },
  ],
]);
</script>

<style scoped></style>
