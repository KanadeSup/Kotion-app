<script setup lang="ts">
import { IconFilePlus, IconFolderPlus } from "@tabler/icons-vue";
defineProps({
   class: {
      type: String,
      default: "",
   },
});
const emit = defineEmits(["openDirectoryModal", "openFileModal"]);
const dropMenuItem = [
   {
      name: "Create directory",
      icon: IconFolderPlus,
      click: () => emit("openDirectoryModal"),
   },
   {
      name: "Create note",
      icon: IconFilePlus,
      click: () => emit("openFileModal"),
   },
];
</script>
<template>
   <DropdownMenu>
      <DropdownMenuTrigger :class="class">
         <slot />
      </DropdownMenuTrigger>
      <DropdownMenuContent class="flex flex-col min-w-[180px]">
         <DropdownMenuItem
            v-for="item in dropMenuItem"
            class="justify-start cursor-pointer px-2 py-[5px] h-auto text-sm"
            @click="item.click"
         >
            <component :is="item.icon" class="w-4 h-4 stroke-gray-300" />
            <span>{{ item.name }}</span>
         </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
</template>
