<template>
  <p class="q-mt-sm text-grey-9">{{ description }}</p>
</template>

<script setup lang="ts">
defineProps<{ description: string }>();
</script>

<style scoped></style>
