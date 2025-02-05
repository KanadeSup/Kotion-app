<template>
   <Popover v-model:open="open">
      <popover-trigger
         class="text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm col-span-2"
      >
         <slot />
      </popover-trigger>
      <popover-content align="start" class="w-48 z-20 p-1">
         <div v-if="isEditPropertyOpen == false">
            <div
               v-for="item in popOverItem"
               class="flex gap-1 items-center py-[5px] px-2 hover:bg-accent cursor-pointer rounded-md"
               :style="{ color: item.color }"
               @click="item.click"
            >
               <component :is="item.icon" class="w-4 h-4" />
               <span class="text-sm"> {{ item.name }}</span>
            </div>
         </div>
         <div v-else>
            <PropertyTextEdit v-if="type == 'text'"  :uuid="uuid"/>
         </div>
      </popover-content>
   </Popover>
   <div v-if="open" class="w-screen h-screen z-10 fixed top-0 left-0" />
</template>

<script setup lang="ts">
import { IconEdit, IconTrash } from "@tabler/icons-vue";
import PropertyTextEdit from "./PropertyTextEdit.vue";

type PROPS = {
   type: "text" | "tag" | "rating" | "url" | "title",
   uuid: string,
} 
const props = defineProps<PROPS>();
const open = ref(false);
const isEditPropertyOpen = ref(false);
const popOverItem = [
   {
      name: "Edit property",
      icon: IconEdit,
      click: () => {
         isEditPropertyOpen.value = true;
      },
   },
   {
      name: "Remove property",
      icon: IconTrash,
      color: "#e92626",
      click: () => {},
   },
];
watch(open, (value) => {
   if (value == true) {
      isEditPropertyOpen.value = false;
   }
});
</script>
