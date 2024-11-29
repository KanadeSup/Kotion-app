<script setup lang="ts">
import Header from './Header.vue';
import ProjectList from './ProjectList.vue';
const sideBarStore = useSideBarStore()
</script>

<template>
   <div>
      <Header />
      <ProjectList />
   </div>
</template>