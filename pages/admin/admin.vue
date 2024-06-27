<template>
  <NuxtPage />
</template>

<script setup lang="ts">
// 항상 수행한다.
definePageMeta({
  middleware: ['admin-only'],
});
</script>

<style scoped></style>
