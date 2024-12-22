<script setup lang="ts">
import { IconFile, IconFilePencil, IconTrash } from "@tabler/icons-vue";
import { buttonVariants } from "~/components/ui/button";
import ItemContext from "./ItemContext.vue";
import type { PropType } from "vue";
import type { File } from "~/types/fileSystem";
import { useModalStore } from "./modalStore";

const props = defineProps({
   nodeData: {
      type: Object as PropType<File>,
      required: true,
   },
   level: {
      type: Number,
      required: true,
   },
});

const fileSystemStore = useFileSystemStore();
const modalStore = useModalStore();
const contextItem = [
   {
      name: "Edit file",
      icon: IconFilePencil,
      click: async () => {
         modalStore.openModal("file", "Update", props.nodeData);
      },
   },
   {
      name: "Delete file",
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
   <ItemContext :items="contextItem">
      <div
         :class="cn(buttonVariants({ variant: 'ghost' }), 'w-full h-auto  px-1 py-1 justify-start')"
         :style="{ paddingLeft: `${level * 10 + 3}px` }"
      >
         <IconFile class="w-5 h-5 stroke-gray-300" />
         <span class="text-sm"> {{ nodeData.name }} </span>
      </div>
   </ItemContext>
</template>
