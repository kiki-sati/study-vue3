<template>
  <div class="grid lg:grid-cols-2 h-screen">

    <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 xl:px-36 2xl:px-52 ">
      <div class="header text-center mb-6">
        <div class="flex justify-center">
          <Logo/>
        </div>
        <h1 class="text-xl font-bold mt-4">로그인 하세요</h1>
      </div>
      <!--    Form-->
      <UCard class="mt-8">
        <UForm :state="formState" :schema="SigninSchema" @submit="handleSignin">
          <UFormGroup class="mb-4" name="email" label="Email">
            <UInput v-model="formState.email" type="email"></UInput>
          </UFormGroup>
          <UFormGroup class="mb-4" name="password" label="Password">
            <UInput v-model="formState.password" type="password"></UInput>
          </UFormGroup>

          <UButton type="submit" :loading="isLoading" block>로그인</UButton>
        </UForm>
      </UCard>
      <!--    ./Form-->
    </div>

    <div class="right hidden lg:block"></div>

  </div>
</template>

<script setup lang="ts">
import SigninSchema from "~/schemas/Signin.schema";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";


const isLoading = ref(false)
const formState = reactive({
  email: undefined,
  password: undefined,
});

const {signIn} = useAuth()

async function handleSignin(event: FormSubmitEvent<z.output<typeof SigninSchema>>) {

  try {
    isLoading.value = true
    await signIn('credentials', {
      email: event.data.email,
      password: event.data.password,
      redirect: false
    });
    await useRouter().push('/');

  } catch (e) {

  } finally {
    isLoading.value = true
  }

}

</script>

<style scoped>
.right {
  background: linear-gradient(-45deg, #22c55e, #10b981, #40E0D0, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>