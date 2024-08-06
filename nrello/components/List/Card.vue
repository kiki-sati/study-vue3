<template>
  <div
    class="p-3 border shadow rounded-lg dark:border-gray-700 text-sm cursor-grab bg-white dark:bg-gray-700"
  >
    <div>{{ card.title }}</div>
    <div v-if="card.label" class="mt-2">
      <span class="label">{{ card.label }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CardDocument } from "~/server/models/Card";

defineProps<{
  card: CardDocument;
}>();
</script>

<style scoped>
.label {
  @apply bg-blue-500 text-white py-1 px-2 rounded-full text-xs;
}
</style>
