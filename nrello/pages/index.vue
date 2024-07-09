<template>
  <WrapperDefault>
    <template #actions>
      <UButton size="xs" @click="showCreateBoard = true">Create board</UButton>
    </template>
    {{ data }}

    <USlideover v-model="showCreateBoard">
      <OverlayHeader
        :on-click="() => (showCreateBoard = false)"
        title="Create a board"
      ></OverlayHeader>
      <div class="p-4">
        <FormBoard></FormBoard>
      </div>
    </USlideover>
  </WrapperDefault>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

const { data } = useFetch("/api/boards");
const showCreateBoard = ref(false);
</script>

<style scoped></style>
