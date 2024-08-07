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
import { ref, reactive } from 'vue';
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";
import type { ListDocument } from "~/server/models/List";
import ListSchema from "~/schemas/List.schema";

interface Props {
  type: "create" | "update";
  initialData?: ListDocument;
  boardId?: string;
  onCreate?: () => void;
  onUpdate?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create",
});
const isLoading = ref(false);
const formState = reactive<Partial<ListDocument>>({
  name: undefined,
  board: props.boardId,
});

const store = useStore();

watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
  }
});

async function handlerForm(
  event: FormSubmitEvent<z.output<typeof ListSchema>>
) {
  try {
    isLoading.value = true; // 로딩 상태 시작

    if (props.type === "update" && props.initialData?._id) {
      await useFetch(`/api/lists/${props.initialData._id}`, {
        method: "PUT",
        body: event.data,
        watch: false,
      });

      props.onUpdate?.();

      useToast().add({
        title: "보드 수정",
      });

      store.closeListCreate(); // 슬라이드 닫기 및 새로고침 플래그 설정
      console.log('store.closeListCreate called'); // 디버깅용 로그

      return;
    }

    const response = await useFetch("/api/lists", {
      method: "POST",
      body: event.data,
      watch: false,
    });
    console.log("API 요청 성공:", response);
    props.onCreate?.();

    useToast().add({
      title: "목록 생성",
    });

    store.closeListCreate(); // 슬라이드 닫기 및 새로고침 플래그 설정
    console.log('store.closeListCreate called'); // 디버깅용 로그

  } catch (error) {
    console.error("API 요청 실패:", error);
  } finally {
    isLoading.value = false; // 로딩 상태 종료
  }
}
</script>
