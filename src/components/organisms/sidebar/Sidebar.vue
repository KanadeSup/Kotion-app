<script setup lang="ts">
import Header from './Header.vue';
import ProjectList from './ProjectList.vue';
import UtilitySection from './UtilitySection.vue';
const sideBarStore = useSideBarStore()
</script>

<template>
   <div class="flex flex-col h-full">
      <Header />
      <UtilitySection />
      <ProjectList />
   </div>
</template>