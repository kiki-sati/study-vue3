<template>
  <div>
    <NuxtLayout name="custom">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  layoutTransition: false,
});
</script>

<style scoped></style>
