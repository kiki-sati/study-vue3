<template>
  <q-page padding>
    <h2>Course</h2>
    <div class="text-subtitle1">
      {{ $route.params }}
    </div>
  </q-page>
</template>

<script setup lang="ts">
const route = useRoute();
console.log(route.params.id);
</script>

<style scoped></style>
