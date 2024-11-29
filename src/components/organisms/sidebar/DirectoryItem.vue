<script setup lang="ts">
import { IconChevronRight, IconFilePlus, IconFolder, IconFolderCog, IconFolderPlus, IconTrash } from "@tabler/icons-vue";
import ItemContext from "./ItemContext.vue";
import { buttonVariants } from "~/components/ui/button";
defineProps({});
const isOpen = ref(false);
const emit = defineEmits(["openDirectoryModal", "openFileModal"]);
const contexItem = [
   {
      name: "Create directory",
      icon: IconFolderPlus,
      click: () => {
         emit("openDirectoryModal");
      },
   },
   {
      name: "Create note",
      icon: IconFilePlus,
      click: () => {
         emit("openFileModal");
      },
   },
   {
      name: "Edit directory",
      icon: IconFolderCog,
      click: () => {
         console.log("Edit directory");
      },
   },
   {
      name: "Delete directory",
      icon: IconTrash,
      class: "text-red-500 font-medium focus:text-red-500",
      iconClass: "stroke-red-500",
      click: () => {
         console.log("Delete directory");
      },
   },
];
</script>

<template>
   <Collapsible v-model:open="isOpen">
      <ItemContext :items="contexItem">
         <CollapsibleTrigger
            :class="cn(buttonVariants({ variant: 'ghost' }), 'w-full h-auto  px-1 py-1')"
         >
            <IconFolder class="w-5 h-5 stroke-gray-300" />
            <span class="text-sm"> Folder one</span>
            <IconChevronRight
               class="w-5 h-5 stroke-gray-300 ml-auto transition-all"
               :class="isOpen ? 'rotate-90' : ''"
            />
         </CollapsibleTrigger>
      </ItemContext>
      <CollapsibleContent>
         <ul>
            <li>File 1</li>
            <li>File 2</li>
            <li>File 3</li>
         </ul>
      </CollapsibleContent>
   </Collapsible>
</template>
