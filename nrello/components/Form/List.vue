<template>
  <UForm :schema="ListSchema" :state="formState" @submit="handlerForm">
    <UFormGroup class="mb-4" label="Name" name="name">
      <UInput v-model="formState.name"></UInput>
    </UFormGroup>

    <UButton :loading="isLoading" block type="submit">
      {{ type === "create" ? "Create List" : "Update List" }}
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue';
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import type { ListDocument } from "~/server/models/List";
import ListSchema from "~/schemas/List.schema";

// Props 인터페이스 정의
interface Props {
  type: "create" | "update";
  initialData?: ListDocument;
  boardId?: string;
  onCreate?: () => void;
  onUpdate?: () => void;
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  type: "create",
});
const isLoading = ref(false);

// form 반응형 객체 상태 정의
const formState = reactive<Partial<ListDocument>>({
  name: undefined,
  board: props.boardId,
});

const store = useStore();

// 초기 데이터 설정
watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
  }
});

// API 요청을 처리하는 함수
async function handleApiRequest(url: string, method: 'POST' | 'PUT', data: any) {
  try {
    isLoading.value = true;
    const response = await useFetch(url, {
      method: method,
      body: data,
      watch: false,
    });
    console.log("API 요청 성공:", response);
    return response;
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  } finally {
    isLoading.value = false;
  }
}

// Form 제출 핸들러
async function handlerForm(event: FormSubmitEvent<z.output<typeof ListSchema>>) {
  try {
    let response;
    if (props.type === "update" && props.initialData?._id) {
      response = await handleApiRequest(`/api/lists/${props.initialData._id}`, "PUT", event.data);
      props.onUpdate?.();
      useToast().add({ title: "보드 수정", description: "보드가 성공적으로 수정되었습니다." });
    } else {
      response = await handleApiRequest("/api/lists", "POST", event.data);
      props.onCreate?.();
      useToast().add({ title: "목록 생성", description: "목록이 성공적으로 생성되었습니다." });
    }

    await store.closeListCreate(); // 슬라이드 닫기 및 새로고침 플래그 설정
    console.log('store.closeListCreate called');

  } catch (error) {
    useToast().add({ title: "오류 발생", description: "API 요청 중 오류가 발생했습니다." });
  }
}
</script>
