<template>
  <div
    class="py-2 px-4 flex justify-between items-center border-b dark:border-gray-800"
  >
    <h3 class="font-semibold">{{ title }}</h3>
    <UButton
      color="gray"
      icon="i-heroicons-x-mark-20-solid"
      variant="ghost"
      @click="onClick"
    ></UButton>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  onClick: () => void;
}>();
</script>

<style scoped></style>
