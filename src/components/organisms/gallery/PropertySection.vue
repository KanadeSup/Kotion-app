<template>
   <div class="w-full rounded-lg grid grid-cols-6 items-stretch gap-2">
      <div class="col-span-2">
         <div
            class="text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
         >
            <IconH1 class="w-4 h-4" />
            Title
         </div>
      </div>
      <div class="col-span-4">
         <div
            class="text-sm flex items-center hover:bg-accent h-8 px-2 rounded cursor-pointer"
            v-if="editingElement.propertyIndex !== 0 || editingElement.cellType !== 'VALUE'"
            @click="openEditProperty(0, 'VALUE')"
         >
            {{ galleryStore.editItem?.properties[0].value }}
         </div>
         <div
            v-if="editingElement.propertyIndex == 0 && editingElement.cellType == 'VALUE'"
            class="col-span-4"
         >
            <input
               ref="property-input"
               class="w-full bg-background border rounded-md px-1 py-1 text-sm focus-visible:outline-none focus-visible:border-gray-400 h-8 text-muted-foreground"
               @blur="
                  (event) => {
                     const target = event.currentTarget as HTMLInputElement | null;
                     if (!target) return;
                     finishEditProperty(target.value);
                  }
               "
            />
         </div>
      </div>
      <div v-if="true" class="col-span-2">
         <Popover>
            <PopoverTrigger class="w-full">
               <div
                  class="text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
               >
                  <IconPlus class="w-4 h-4" />
                  Add a property
               </div>
            </PopoverTrigger>
            <PopoverContent align="start" class="flex flex-col p-1 w-[150px]">
               <div
                  v-for="item in propertyType"
                  class="flex gap-2 items-center text-sm text-gray-300 hover:bg-accent p-1 rounded-md cursor-pointer"
               >
                  <component :is="item.icon" class="w-4 h-4" />
                  <p>{{ item.name }}</p>
               </div>
            </PopoverContent>
         </Popover>
      </div>
      <div v-else class="col-span-2">
         <input
            ref="property-input"
            class="w-full bg-background border rounded-md px-1 py-1 text-sm focus-visible:outline-none focus-visible:border-gray-400 h-8 text-muted-foreground"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { IconAlignLeft, IconH1, IconPlus, IconStar, IconTag } from "@tabler/icons-vue";
import type { GalleryProperty } from "~/types/fileSystem";

const galleryStore = useGalleryStore();
type EditingElement = {
   propertyIndex: number | null;
   cellType: "KEY" | "VALUE" | null;
   value: null | GalleryProperty;
};
const editingElement = ref<EditingElement>({
   propertyIndex: null,
   cellType: null,
   value: null,
});
const inputRef = useTemplateRef("property-input");
const propertyType = [
   {
      name: "Text",
      icon: IconAlignLeft,
   },
   {
      name: "Tag",
      icon: IconTag,
   },
   {
      name: "Rating",
      icon: IconStar,
   },
];
function openEditProperty(propertyIndex: number, cellType: "KEY" | "VALUE") {
   if (!galleryStore.editItem) return;
   editingElement.value = {
      propertyIndex,
      cellType,
      value: galleryStore.editItem.properties[propertyIndex],
   };
   nextTick(() => {
      inputRef.value?.focus();
      if (!galleryStore.editItem || !inputRef.value) return;

      // This need to be tempoorary handle, need a better way
      inputRef.value.value = galleryStore.editItem.properties[propertyIndex].value as string;
   });
}
async function finishEditProperty(value: any) {
   const editProperty = editingElement.value.value;
   if (
      !editProperty ||
      !galleryStore.editItem ||
      editingElement.value.propertyIndex == null ||
      !value
   ) {
      editingElement.value = {
         propertyIndex: null,
         cellType: null,
         value: null,
      };
      return;
   }
   editProperty.value = value;
   const updatedItem = galleryStore.editItem;
   const updatedProperties = updatedItem.properties;
   updatedProperties[editingElement.value.propertyIndex] = editProperty;
   galleryStore.updateItem(updatedItem.id, updatedItem);
   await galleryStore.save();
   editingElement.value = {
      propertyIndex: null,
      cellType: null,
      value: null,
   };
}
</script>
