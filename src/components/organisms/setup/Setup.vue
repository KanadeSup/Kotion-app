<script setup lang="ts">
import { setVaultPath } from "~/api/fileSystem";
import FileInputText from "~/components/atoms/FileInputText.vue";
const vaultPath = ref<string | null>(null);
const inputError = ref<string | null>(null)
async function setVaultLocation() {
   if(vaultPath.value == null) {
      inputError.value = "The path is not set"
      return;
   }
   const res = await setVaultPath(vaultPath.value);
   if(res.ok) {
      await useConfigStore().setPath(vaultPath.value)
      await useFileSystemStore().fetch()

   } else {
      inputError.value = "Something went wrong, please try again"
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
         <FileInputText v-model:value="vaultPath" :error="inputError" @change="inputError = null"/>
         <Button class="w-full bg-[#ededed]"
            @click="setVaultLocation"
         > 
            Start 
         </Button>
      </div>
   </div>
</template>
