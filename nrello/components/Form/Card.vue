<template>
  <UForm :schema="CardSchema" :state="formState">
    <UFormGroup label="Title" name="title">
      <UInput v-model="formState.title"></UInput>
    </UFormGroup>
    <UFormGroup label="Description" name="description">
      <ClientOnly>
        <QuillEditor v-model:content="formState.description"></QuillEditor>
      </ClientOnly>
    </UFormGroup>
  </UForm>
</template>

<script lang="ts" setup>
import CardSchema from "~/schemas/Card.schema.js";
import { BoardDocument } from "~/server/models/Board.model";
import type { CardDocument } from "~/server/models/Card.model";

interface Props {
  type: "create" | "update";
  initialData?: CardDocument;
  listId: string;
  onCreate?: () => void;
  onUpdate?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  type: "create",
});

const formState = reactive({
  description: undefined,
  title: undefined,
});
</script>
