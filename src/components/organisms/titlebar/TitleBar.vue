<script setup lang="ts">
import { IconLayoutSidebar } from "@tabler/icons-vue";
import IconButton from "~/components/atoms/IconButton.vue";
const sideBarStore = useSideBarStore()
</script>

<template>
   <div class="h-[51px] border-b flex items-center px-1 flex-shrink-0 gap-2">
      <IconButton @click="sideBarStore.toggle">
         <IconLayoutSidebar class="w-5 h-5 text-gray-300" />
      </IconButton>
      <slot />
   </div>
</template>
