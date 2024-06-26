<template>
  <q-form class="q-gutter-lg" @submit.prevent="handleLoginSubmit">
    <q-input v-model="form.email" filled label="email" />

    <q-input v-model="form.passwowrd" filled type="password" label="password" />

    <div class="q-mt-lg">
      <q-btn
        class="full-width"
        label="Login"
        type="submit"
        size="lg"
        color="primary"
        no-caps
        :loading="loading"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  success: [];
}>();
// const emit = defineEmits(['success']);

const form = ref({
  email: '',
  passwowrd: '',
});
const error = ref<Error | null>(null);
const loading = ref(false);

const handleLoginSubmit = () => {
  try {
    error.value = null;
    loading.value = true;

    // login business logic

    emit('success');
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err;
    } else {
      throw Error;
    }
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 1500);
  }
};
</script>

<style scoped></style>
