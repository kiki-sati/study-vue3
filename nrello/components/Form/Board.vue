<template>
  <UForm :schema="BoardSchema" :state="formState" @submit="handlerForm">
    <UFormGroup class="mb-4" label="Name" name="name">
      <UInput v-model="formState.name"></UInput>
    </UFormGroup>
    <UButton :loading="isLoading" block type="submit">
      {{ type === "create" ? "Create Board" : "Update Board" }}
    </UButton>
  </UForm>
</template>

<script lang="ts" setup>
import type { BoardDocument } from "~/server/models/Board.model";
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
  type: "create",
});
const isLoading = ref(false);
const formState = reactive<Partial<BoardDocument>>({
  name: undefined,
  coverImage: undefined,
});

watchEffect(() => {
  if (props.type === "update" && props.initialData) {
    formState.name = props.initialData.name;
    formState.coverImage = props.initialData.coverImage;
  }

  /*  if (props.type === "create") {
    formState.name = undefined;
    formState.coverImage = undefined;
  }*/
});
async function handlerForm(
  event: FormSubmitEvent<z.output<typeof BoardSchema>>
) {
  try {
    isLoading.value = true;
    await useFetch("/api/boards", {
      method: "POST",
      body: event.data,
      watch: false,
    });
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped></style>
