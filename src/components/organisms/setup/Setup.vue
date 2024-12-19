<script setup lang="ts">
import { open } from "@tauri-apps/plugin-dialog";
import { setVaultPath } from "~/api/fileSystem";
const vaultPath = ref<string | null>(null);
const inputState = ref({
   directoryInputError : false
})
async function openFileDiaglog() {
   const directoryPath = await open({
      multiple: false,
      directory: true,
   });
   if (directoryPath == null) return;
   inputState.value.directoryInputError = false
   vaultPath.value = directoryPath;
}
async function setVaultLocation() {
   if(vaultPath.value == null) {
      inputState.value.directoryInputError = true
      return;
   }
   const res = await setVaultPath(vaultPath.value);
   if(res.ok) {
      useConfigStore().fetchVaultPath()
   } else {
      inputState.value.directoryInputError = true
   }
}
</script>

<template>
   <div class="h-screen w-full flex items-center justify-center select-none">
      <div class="w-[400px] rounded-md border p-5 space-y-4">
         <div class="">
            <h1 class="font-medium">Choose your vault location</h1>
            <p class="text-sm text-muted-foreground">Choose your directory to store your data</p>
         </div>
         <button
            class="text-sm p-2 border rounded-md w-full flex items-center gap-2"
            :class="inputState.directoryInputError ? 'border-[#c42727] hover:border-[#b33737]' : 'border-[#575757] hover:border-[#464646]'"
            @click="openFileDiaglog"
         >
            <span class="text-muted-foreground" v-if="vaultPath == null">
               Choose your vault location
            </span>
            <span class="text-gray-300 truncate" v-if="vaultPath !== null"> {{ vaultPath }}</span>
         </button>
         <Button class="w-full bg-[#ededed]"
            @click="setVaultLocation"
         > 
            Start 
         </Button>
      </div>
   </div>
</template>
