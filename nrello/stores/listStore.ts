// stores/listStore.ts
import { defineStore } from 'pinia';
import type { ListDocument } from "~/server/models/List";

export const useListStore = defineStore('list', {
  state: () => ({
    showListCreate: false,
    selectedList: null as ListDocument | null,
  }),
  actions: {
    toggleShowListCreate() {
      this.showListCreate = !this.showListCreate;
    },
    closeShowListCreate() {
      this.showListCreate = false;
    },
    setSelectedList(list: ListDocument | null) {
      this.selectedList = list;
    }
  }
});
