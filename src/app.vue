<script setup lang="ts">
import Setup from "./components/organisms/setup/Setup.vue";
const configStore = useConfigStore();
await configStore.fetchVaultPath();
const vaultPath = configStore.vaultPath;
</script>
<template>
   <div class="h-screen font-geist">
      <NuxtLayout name="primary-default" v-if="vaultPath !== null">
         <NuxtPage />
      </NuxtLayout>
      <Setup v-if="vaultPath == null" />
   </div>
</template>
