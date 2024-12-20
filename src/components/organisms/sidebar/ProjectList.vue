<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";
import DirectoryItem from "./DirectoryItem.vue";
import FileItem from "./FileItem.vue";
import ProjectPopover from "./ProjectPopover.vue";
import DirectoryModal from "./DirectoryModal.vue";
import FileModal from "./FileModal.vue";
import { getFileSystemNodes } from "~/api/fileSystem";
import type { FileSystemNode } from "~/types/fileSystem";

const isDirectoryModalOpen = ref(false);
const isFileModalOpen = ref(false);
const fileSystemNodes = ref<FileSystemNode[]>([]);
onMounted(async () => {
   const res = await getFileSystemNodes();
   if(res.ok) {
      fileSystemNodes.value = res.data;
   }
});
function openDirectoryModal() {
   isDirectoryModalOpen.value = true;
}
function openFileModal() {
   isFileModalOpen.value = true;
}
</script>

<template>
   <div class="px-1 py-3">
      <div class="flex pl-1 mb-2 items-center">
         <h1>Project</h1>
         <ProjectPopover
            class="p-1 rounded hover:bg-accent cursor-pointer ml-auto"
            @open-directory-modal="openDirectoryModal"
            @open-file-modal="openFileModal"
         >
            <IconPlus class="w-4 h-4 stroke-gray-300" />
         </ProjectPopover>
      </div>
      <div v-for="node in fileSystemNodes" :key="node.absolutePath">
         <DirectoryItem
            @open-directory-modal="openDirectoryModal"
            @open-file-modal="openFileModal"
            v-if="node.type === 'directory'"
            :node-data="node"
         />
         <FileItem v-if="node.type === 'file'" :node-data="node" />
      </div>

      <DirectoryModal v-model:open="isDirectoryModalOpen" />
      <FileModal v-model:open="isFileModalOpen" />
   </div>
</template>
