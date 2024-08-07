import { defineStore } from 'pinia';
import type { ListDocument } from '~/server/models/List';

export const useStore = defineStore('main', {
  state: () => ({
    showListCreate: false,
    selectedList: undefined as ListDocument | undefined,
    refreshBoardFlag: false,
  }),
  actions: {
    handleListModify(list: ListDocument) {
      this.showListCreate = true;
      this.selectedList = list;
      console.log('handleListModify called, showListCreate:', this.showListCreate);
    },
    async closeListCreate() {
      this.showListCreate = false;
      this.selectedList = undefined;
      this.refreshBoardFlag = !this.refreshBoardFlag;
      console.log('closeListCreate called, showListCreate:', this.showListCreate);
      await nextTick();
      console.log('nextTick showListCreate:', this.showListCreate);
    }
  },
});
