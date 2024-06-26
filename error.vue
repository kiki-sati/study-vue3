<template>
  <div class="flex flex-center column window-height text-center">
    <div class="text-h1">{{ error.statusCode }}</div>
    <p class="q-my-lg text-subtitle1">{{ error.message }}</p>
    <div class="text-h6">error props</div>
    <p class="text-subtitle2">
      {{ JSON.stringify(error) }}
    </p>
    <div class="text-h6">useError</div>
    <p class="text-subtitle2">
      {{ JSON.stringify(globalError) }}
    </p>
    <q-btn
      label="go home"
      size="lg"
      color="primary"
      no-caps
      @click="handelError"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

// 전역 에러를 반환하는 컴포저블 함수
const globalError = useError();

// const handelError = () => clearError();
const handelError = () => clearError({ redirect: '/' });
</script>

<style scoped></style>
