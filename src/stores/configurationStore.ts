import { defineStore } from "pinia";
import { getVaultPath } from "~/api/fileSystem";

type configState = {
   vaultPath: null | string;
};

export const useConfigStore = defineStore("configStore", {
   state: (): configState => ({
      vaultPath: null,
   }),
   actions: {
      async fetchVaultPath() {
         const res = await getVaultPath();
         if (res.ok) {
            this.vaultPath = res.data;
         }
      },
   },
});