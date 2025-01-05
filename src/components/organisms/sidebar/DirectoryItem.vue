<script setup lang="ts">
import {
   IconChevronRight,
   IconFilePlus,
   IconFolder,
   IconFolderCog,
   IconFolderPlus,
   IconTrash,
} from "@tabler/icons-vue";
import ItemContext from "./ItemContext.vue";
import { buttonVariants } from "~/components/ui/button";
import type { Directory } from "~/types/fileSystem";
import FileItem from "./FileItem.vue";
import { useModalStore } from "./modalStore";

const props = defineProps({
   nodeData: {
      type: Object as PropType<Directory>,
      required: true,
   },
   level: {
      type: Number,
      required: true,
   },
});
const isOpen = ref(false);
const modalStore = useModalStore();
const fileSystemStore = useFileSystemStore();
const contexItem = [
   {
      name: "Create directory",
      icon: IconFolderPlus,
      click: () => {
         modalStore.openDirectoryModal("Create", props.nodeData);
      },
   },
   {
      name: "Create note",
      icon: IconFilePlus,
      click: () => {
         modalStore.openFileModal("Create", "NOTE", props.nodeData);
      },
   },
   {
      name: "Create gallery",
      icon: IconFilePlus,
      click: () => {
         modalStore.openFileModal("Create", "GALLERY", props.nodeData);
      },
   },
   {
      name: "Edit directory",
      icon: IconFolderCog,
      click: () => {
         modalStore.openDirectoryModal("Update", props.nodeData);
      },
   },
   {
      name: "Delete directory",
      icon: IconTrash,
      class: "text-red-500 font-medium focus:text-red-500",
      iconClass: "stroke-red-500",
      click: async () => {
         await fileSystemStore.remove(props.nodeData.absolutePath);
      },
   },
];
</script>

<template>
   <Collapsible v-model:open="isOpen">
      <ItemContext :items="contexItem">
         <CollapsibleTrigger
            :class="cn(buttonVariants({ variant: 'ghost' }), 'w-full h-auto  px-1 py-1')"
            :style="{ paddingLeft: `${level * 10 + 4}px` }"
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
         <div v-for="node in nodeData.children" :key="node.absolutePath">
            <DirectoryItem v-if="node.type === 'directory'" :node-data="node" :level="level + 1" />
            <FileItem v-if="node.type === 'file'" :node-data="node" :level="level + 1" />
         </div>
      </CollapsibleContent>
   </Collapsible>
</template>
