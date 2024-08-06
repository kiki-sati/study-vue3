<template>
  <WrapperAuth title="계정에 로그인 하세요">
    <UForm :schema="SigninSchema" :state="formState" @submit="handleSignin">
      <UFormGroup class="mb-4" label="Email" name="email">
        <UInput v-model="formState.email" type="email"></UInput>
      </UFormGroup>
      <UFormGroup class="mb-4" label="Password" name="password">
        <UInput v-model="formState.password" type="password"></UInput>
      </UFormGroup>

      <UButton :loading="isLoading" block class="mb-3" type="submit">로그인</UButton>
      <UButton block @click="redirectToSignUp">회원가입</UButton>
    </UForm>
  </WrapperAuth>
</template>

<script lang="ts" setup>
import SigninSchema from "~/schemas/Signin.schema";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";


const isLoading = ref(false)
const formState = reactive({
  email: undefined,
  password: undefined,
});

const {signIn} = useAuth()

let router = useRouter()

async function handleSignin(event: FormSubmitEvent<z.output<typeof SigninSchema>>) {

  try {
    isLoading.value = true
    const res = await signIn('credentials', {
      email: event.data.email,
      password: event.data.password,
      redirect: false
    });

    // @ts-expect-error
    if (!res.error) {
      router.push('/')
    }

  } catch (e) {

  } finally {
    isLoading.value = false
  }
}



function redirectToSignUp() {
  router.push('/auth/signup')
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