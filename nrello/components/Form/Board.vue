<template>
  <UForm :schema="BoardSchema" :state="formState" @submit="handlerSubmit">
    <UFormGroup class="mb-4" label="Name" name="name">
      <UInput v-model="formState.name"></UInput>
    </UFormGroup>
    <UFormGroup class="mb-4" label="Cover Image" name="coverImage">
      <ImagePicker v-model="formState.coverImage"></ImagePicker>
    </UFormGroup>
    <UButton :loading="isLoading" block type="submit">
      {{ type === "create" ? "Create Board" : "Update Board" }}
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board";
import BoardSchema from "~/schemas/Board.schema";
import type { FormSubmitEvent } from "#ui/types";
import { z } from "zod";

interface Props {
  type: "create" | "update";
  initialData?: BoardDocument;
  onCreate?: () => void;
  onUpdate?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create"
});

// 반응형으로 만들기위해 ref, reactive  사용.
// 해당 값을 참조하는 모든 템플릿 혹은 컴포넌트가 자동으로 업데이트 됨
const isLoading = ref(false);
const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined
});

// watchEffect 를 통해 수정 일 때 데이터를 주입하여 노출 시켜 줌
/*watchEffect는 watch와 매우 유사한데 의존성 배열을 넘기지 않으며
watchEffect 내부에 reactivity가 주입된 값들 전부를 추적하고 그 값들중 하나라도 변하면 effect 함수가 실행된다.
또한 useEffect와 마찬가지로 두 메소드 다 처음 마운트될 때 한번은 무조건 실행된다.*/
watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
    formState.coverImage = props.initialData.coverImage;
  }
});

function addToast(type : string) {
  if (type === "update") {
    useToast().add({
      title: "보드 수정"
    });
  } else {
    useToast().add({
      title: "보드 생성"
    });
  }
}

async function handleApiRequest(url: string, method: "POST" | "PUT", data?: any) {
  try {
    isLoading.value = true;
    return await useFetch(url, {
      method,
      body: JSON.stringify(data),
      watch: false
    });
  } catch (e: unknown) {
    useToast().add({
      title: "Error",
      description: (e as Error).message || "오류가 발생하였습니다."
    });
    throw e;
  } finally {
    isLoading.value = false;
  }
}

async function handlerSubmit(
  event: FormSubmitEvent<z.output<typeof BoardSchema>>
) {
  const type = props.type;
  const url = type === "update" && props.initialData?._id ?
    `/api/boards/${props.initialData._id}` :
    "/api/boards";

  const method = type === "update" ? "PUT" : "POST";

  try {
    isLoading.value = true; // 로딩 상태 시작

    await handleApiRequest(url, method, event.data);
    type === "update" ? props.onUpdate?.() : props.onCreate?.();
    addToast(type)
  } catch
    (error) {
    console.error("API 요청 실패:", error);
  } finally {
    isLoading.value = false; // 로딩 상태 종료
  }
}
</script>