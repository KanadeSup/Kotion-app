import { defineStore } from "pinia";
import { getVaultPath, setVaultPath } from "~/api/fileSystem";

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
            return true
         }
         return false
      },
      async setPath(dirPath: string) {
         const res = await setVaultPath(dirPath)
         if(res.ok) {
            this.vaultPath = dirPath;
            return true
         }
         return false
      }
   },
});