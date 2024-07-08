<template>
  <div>
    <WrapperAuth title="회원 가입">
      <UForm :state="formState" :schema="SignupSchema" @submit="handleSubmit">
        <UFormGroup class="mb-4" name="name" label="Name">
          <UInput v-model="formState.name"></UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" name="email" label="Email">
          <UInput type="email" v-model="formState.email"></UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" name="password" label="Password">
          <UInput type="password" v-model="formState.password"></UInput>
        </UFormGroup>
        <UFormGroup class="mb-4" name="passwordConfirm" label="Confirm Password">
          <UInput type="password" v-model="formState.passwordConfirm"></UInput>
        </UFormGroup>
        <UButton block type="submit" :loading="isLoading">회원가입하기</UButton>


      </UForm>

    </WrapperAuth>
  </div>
</template>

<script setup lang="ts">
import SignupSchema from "~/schemas/Signup.schema";
import type {FormSubmitEvent} from "#ui/types";
import {z} from "zod";

const isLoading = ref(false)
const formState = reactive({
  name:undefined,
  email:undefined,
  password:undefined,
  passwordConfirm:undefined,
})

async function handleSubmit(event: FormSubmitEvent<z.output<typeof SignupSchema>>) {

  try {
    isLoading.value = true;

    await useFetch('/api/auth/signup', {
      method: "POST",
      body: event.data,
      watch: false
    })
    useToast().add({
      title:"회원가입 완료",
      description:"당신의 계정은 성공적으로 생성 되었습니다. 로그인 페이지로 이동합니다. 로그인 하세요",
      timeout:2000
    })

    await useRouter().push({
      name: "auth-signin"
    })

  } catch (e:any){
    useToast().add({
      title:"오류",
      description:e.message || "오류 발생",
    })
  } finally {
    isLoading.value = false;

  }

}

</script>

<style scoped>

</style>