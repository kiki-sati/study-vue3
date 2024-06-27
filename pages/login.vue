<template>
  <q-page padding>
    <div class="flex flex-center column q-pt-xl">
      <PageAuthTitle title="Login" />
      <PageAuthDescription description="Hello world" />
      <FormLogin style="width: 400px" @success="handleLoginSuccess" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
const handleLoginSuccess = async () => {
  const { isAdmin } = useAuthUser();
  const redirect = isAdmin.value ? '/admin' : '/';

  // navigateTo 는 비동기 함수이기 때문에 async, await를 넣어줘야 한다.
  await navigateTo(redirect);
};
</script>
