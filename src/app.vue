<script setup lang="ts">
import Setup from "./components/organisms/setup/Setup.vue";
const configStore = useConfigStore();
onMounted(async () => {
   await configStore.fetchVaultPath();
   const isSuccess = await useFileSystemStore().fetch();
   if (!isSuccess) {
      console.error(`File System fetched failed on <ProjectList>`);
   }
});
</script>
<template>
   <div class="h-screen font-geist">
      <NuxtLayout name="primary-default" v-if="configStore.vaultPath !== null">
         <NuxtPage />
      </NuxtLayout>
      <Setup v-if="configStore.vaultPath == null" />
   </div>
</template>
