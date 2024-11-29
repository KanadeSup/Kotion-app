import { defineStore } from "pinia";

export const useSideBarStore = defineStore("sideBarStore", {
   state: () => ({
      isOpen: true,
   }),
   actions: {
      toggle() {
         this.isOpen = !this.isOpen;
      },
   },
});
