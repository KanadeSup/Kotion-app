import { defineStore } from "pinia";

type configState = {
   isSettingModalOpen: boolean
};

export const useSettingStore = defineStore("settingStore", {
   state: (): configState => ({
      isSettingModalOpen: false
   }),
   actions: {
      openModal() {
         this.isSettingModalOpen = true;
      }
   },
});