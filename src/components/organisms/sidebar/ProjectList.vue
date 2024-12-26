<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";
import DirectoryItem from "./DirectoryItem.vue";
import FileItem from "./FileItem.vue";
import ProjectPopover from "./ProjectPopover.vue";
import DirectoryModal from "./DirectoryModal.vue";
import FileModal from "./FileModal.vue";
import { useModalStore } from "./modalStore";

const modalStore = useModalStore();
const fileSystemStore = useFileSystemStore();

function openDirectoryModal(actionType: "Create" | "Update") {
   modalStore.openModal("directory", actionType, null);
}

function openFileModal(actionType: "Create" | "Update") {
   modalStore.openModal("file", actionType, null);
}

</script>

<template>
   <div class="px-1 mt-2">
      <div class="flex pl-1 mb-2 items-center">
         <h1 class="text-sm text-gray-300">Project</h1>
         <ProjectPopover
            class="p-1 rounded hover:bg-accent cursor-pointer ml-auto"
            @open-directory-modal="openDirectoryModal"
            @open-file-modal="openFileModal"
         >
            <IconPlus class="w-4 h-4 stroke-gray-300" />
         </ProjectPopover>
      </div>
      <div
         v-if="fileSystemStore.data"
         v-for="node in fileSystemStore.data"
         :key="node.id"
      >
         <DirectoryItem v-if="node.type === 'directory'" :node-data="node" :level="0" />
         <FileItem v-if="node.type === 'file'" :node-data="node" :level="0" />
      </div>

      <DirectoryModal
         :data="modalStore.directoryModal.data"
         :type="modalStore.directoryModal.actionType"
         v-model:open="modalStore.directoryModal.isOpen"
      />
      <FileModal
         :data="modalStore.fileModal.data"
         :type="modalStore.fileModal.actionType"
         v-model:open="modalStore.fileModal.isOpen"
      />
   </div>
</template>
