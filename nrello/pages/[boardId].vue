<template>
  <wrapperDefault
    v-if="data"
    :style="{
      backgroundImage: `url(${data.coverImage}`,
      backgroundSize: 'cover',
      _backgroundPosition: 'center',
    }"
    class="h-screen"
  >
    <template #actions>
      <UButton size="xs" @click="showListCreate = true"
        >보드를 생성 합니다요 룰루랄라</UButton
      >
    </template>
    <h1 class="text-3xl font-semibold mb-4 inline-block">{{ data.name }}</h1>

    <!--    List Container-->
    <ListContainer :list="data.lists"></ListContainer>
    <!--    // List Container-->

    <USlideover v-model="showListCreate">
      <OverlayHeader
        :on-click="() => (showListCreate = false)"
        :title="selectedList ? '목록 수정' : '목록 생성'"
      ></OverlayHeader>

      <div class="p-4">
        <FormList
          :board-Id="boardId"
          :initial-data="selectedList"
          :on-create="
            () => {
              refresh();
              showListCreate = false;
            }
          "
          :type="selectedList ? 'update' : 'create'"
        ></FormList>
      </div>
    </USlideover>
  </wrapperDefault>
</template>

<script lang="ts" setup>
import type { ListDocument } from "~/server/models/List.model";
import type { BoardDocument } from "~/server/models/Board.model";
import { _backgroundPosition } from "#tailwind-config/theme";

const { boardId } = useRoute().params;

const { data, refresh } = await useFetch<BoardDocument>(
  `/api/boards/${boardId}`
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: "보드를 찾을 수 없습니다.",
  });
}

const selectedList = ref<ListDocument | undefined>();
const showListCreate = ref(false);
</script>

<style scoped></style>
