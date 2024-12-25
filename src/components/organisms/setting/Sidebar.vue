<template>
   <div class="min-w-[230px] bg-[#212121E6] border p-2 space-y-2 py-5">
      <h1 class="font-bold text-gray-500 text-sm px-1">Options</h1>
      <div class="space-y-1">
         <div
            v-for="item of sideBarItem"
            class="p-1 rounded-md hover:bg-[#74747470] cursor-pointer font-semibold flex items-center gap-1 transition-all"
            :class="selectedItem.name === item.name ? 'bg-[#74747470]' : ''"
            @click="selectedItem = item; selectedComponent = item.component"
         >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.name }}
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { IconEdit, IconFile, IconSettings } from "@tabler/icons-vue";
import General from "./General.vue";

const sideBarItem = [
   {
      name: "General",
      icon: IconSettings,
      component: General,
   },
   {
      name: "Editor",
      icon: IconEdit,
      component: General,
   },
   {
      name: "File",
      icon: IconFile,
      component: General,
   },
];
const selectedItem = ref(sideBarItem[0]);
const selectedComponent = defineModel("selectedComponent", {
   type: Object,
   default: General,
   required: true
})
</script>
