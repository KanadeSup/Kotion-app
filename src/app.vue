<script setup lang="ts">
import Setting from "./components/organisms/setting/Setting.vue";
import Setup from "./components/organisms/setup/Setup.vue";
const configStore = useConfigStore();
onMounted(async () => {
   let isFetchSuccess = await configStore.fetchVaultPath();
   if(!isFetchSuccess) return;
   isFetchSuccess = await useFileSystemStore().fetch();
   if (!isFetchSuccess) {
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
      
      <!-- Global component -->
      <Setting />
   </div>
</template>
