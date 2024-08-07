<template>
  <UForm :schema="CardSchema" :state="formState" @submit="handleSubmit">
    <UFormGroup class="mb-4" label="Title" name="title">
      <UInput v-model="formState.title" autofocus type="text" />
    </UFormGroup>

    <UFormGroup class="mb-4" label="Description" name="description">
      <ClientOnly>
        <QuillEditor
          v-model:content="formState.description"
          content-type="html"
          theme="snow"
          toolbar="minimal"
        />
      </ClientOnly>
    </UFormGroup>

    <UFormGroup class="mb-4" label="Label" name="label">
      <UInput v-model="formState.label" type="text" />
    </UFormGroup>

    <div class="flex gap-4 mt-4 justify-end">
      <UButton
        v-if="type === 'update'"
        :loading="isLoading"
        color="red"
        icon="i-heroicons-trash"
        type="button"
        variant="soft"
        @click="handleDelete"
      >
      </UButton>
      <UButton :block="type === 'create'" :loading="isLoading" type="submit">
        {{ type === "create" ? "생성" : "수정" }}
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import { z } from "h3-zod";
import CardSchema from "~/schemas/Card.schema";
import type { CardDocument } from "~/server/models/Card";

// Props 인터페이스 정의
interface Props {
  type: "create" | "update";
  listId: string;
  initialData?: Partial<CardDocument>;  // 카드 초기 데이터(수정 시 사용)
  onCreate?: () => void;
  onUpdate?: () => void;
}

// Props 기본값 설정
const props = withDefaults(defineProps<Props>(), {
  type: "create",
});

// CardSchema의 부분 스키마 정의
// 부분 스키마 정의로 일부 필드만 업데이트 및 유효성 검사를 통과하도록 함
const PartialCardSchema = CardSchema.partial();

// 로딩 상태를 나타내는 ref 변수
const isLoading = ref(false);

// 폼 상태를 나타내는 reactive 변수
// reactive는 반응형 객체로 반환함.
// 단일 값이나 기본형 데이터를 반응형으로 만들고 싶다면 ref를 사용.
// 객체를 반응형으로 만들고 싶다면 reactive를 사용.
const formState = reactive<z.infer<typeof PartialCardSchema>>({
  title: undefined,
  description: undefined,
  label: undefined,
  list: props.listId,
});

// 폼 상태 초기화 함수
function initializeFormState() {
  const initialData = props.initialData;
  if (props.type === "update" && initialData) {
    formState.title = initialData.title;
    formState.description = initialData.description;
    formState.label = initialData.label;
  } else {
    formState.title = undefined;
    formState.description = undefined;
    formState.label = undefined;
  }
}

// API 요청 처리 함수
async function handleApiRequest(url: string, method: 'POST' | 'PUT' | 'DELETE', data?: any) {
  try {
    isLoading.value = true;
    return await useFetch(url, {
      method,
      body: JSON.stringify(data),
      watch: false,
    });
  } catch (e: unknown) {
    useToast().add({
      title: "Error",
      description: (e as Error).message || "오류가 발생하였습니다.",
    });
    throw e;
  } finally {
    isLoading.value = false;
  }
}

// Form 전달 함수
async function handleSubmit(e: FormSubmitEvent<z.output<typeof CardSchema>>) {
  const url = props.type === "update" && props.initialData?._id
    ? `/api/lists/${props.listId}/cards/${props.initialData._id}`
    : `/api/lists/${props.listId}/cards`;
  const method = props.type === "update" ? "PUT" : "POST";

  try {
    await handleApiRequest(url, method, e.data);
    props.type === "update" ? props.onUpdate?.() : props.onCreate?.();
  } catch (e: unknown) {
    console.error(e);
  }
}

// 카드 삭제 처리 함수
async function handleDelete() {
  if (props.initialData?._id) {
    const url = `/api/lists/${props.listId}/cards/${props.initialData._id}`;
    try {
      await handleApiRequest(url, "DELETE");
      props.onUpdate?.();
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

/*폼 상태 초기화 함수를 watch 함.
props.type이나 props.initialData가 변경될 때마다 initializeFormState 함수가 실행된다.
컴포넌트가 마운트되면 watchEffect에 의해 initializeFormState 함수가 호출되어 폼 상태를 초기화 시킨다.
*/
watchEffect(initializeFormState);
</script>


<style scoped>
.ql-editor {
  @apply h-32 rounded-b-lg shadow;
}
.ql-container {
  @apply h-32 rounded-b-lg shadow;
}
.ql-toolbar {
  @apply rounded-t-lg;
}
</style>
