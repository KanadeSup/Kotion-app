<script setup lang="ts">
import { IconChevronRight, IconFilePlus, IconFolder, IconFolderCog, IconFolderPlus, IconTrash } from "@tabler/icons-vue";
import ItemContext from "./ItemContext.vue";
import { buttonVariants } from "~/components/ui/button";
import type { Directory } from "~/types/fileSystem"
import FileItem from "./FileItem.vue";

const props = defineProps({
   nodeData: {
      type: Object as PropType<Directory>,
      required: true
   }
});
for (const node of props.nodeData.children) {
   node.type
}
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
            <span class="text-sm"> {{ nodeData.name }} </span>
            <IconChevronRight
               class="w-5 h-5 stroke-gray-300 ml-auto transition-all"
               :class="isOpen ? 'rotate-90' : ''"
            />
         </CollapsibleTrigger>
      </ItemContext>
      <CollapsibleContent>
         <div
            v-for="node in nodeData.children"
            :key="node.absolutePath" 
         >
            <DirectoryItem 
               v-if="node.type === 'directory'"
               :node-data="node"
            />
            <FileItem
               v-if="node.type === 'file'"
               :node-data="node"
            />
         </div>
      </CollapsibleContent>
   </Collapsible>
</template>
