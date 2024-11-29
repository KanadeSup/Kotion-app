<script setup lang="ts">
import Splitter from "~/components/atoms/Splitter.vue";
import Sidebar from "~/components/organisms/sidebar/Sidebar.vue";
import TitleBar from "./TitleBar.vue";
const sideBarStore = useSideBarStore();
</script>

<template>
   <Splitter container-class="h-screen" :first-panel-class="sideBarStore.isOpen ? '' : 'hidden'">
      <template v-slot:first>
         <Sidebar />
      </template>
      <template v-slot:second>
         <TitleBar />
         <slot />
      </template>
   </Splitter>
</template>
