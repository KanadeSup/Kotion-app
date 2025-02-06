<template>
   <div class="p-1 relative">
      <div class="text-gray-300 text-sm">Tag Property</div>
      <div class="flex gap-1 mt-1">
         <Input
            class="h-auto py-0 text-sm focus-visible:ring-0 focus-visible:outline-none focus-visible:border-gray-500 rounded"
            v-model:model-value="inputNameRef"
         />
         <Button
            variant="outline"
            size="icon"
            class="shrink-0 h-7 w-7"
            :disabled="inputNameRef == defaultValue"
            @click="inputNameRef = defaultValue"
         >
            <IconRestore />
         </Button>
      </div>
      <div class="mt-3 z-40 relative">
         <div class="flex justify-between px-1" v-if="!isAddingOption">
            <div class="text-xs text-gray-400">Options</div>
            <IconPlus
               class="w-4 h-4 stroke-gray-400 cursor-pointer"
               @click="isAddingOption = true"
            />
         </div>
         <Input
            class="h-auto py-1 text-xs focus-visible:ring-0 focus-visible:outline-none focus-visible:border-gray-500 rounded"
            v-model:model-value="inputOptionRef"
            @keyup.enter="addOption"
            v-if="isAddingOption"
         />
      </div>
      <div
         class="w-full h-full absolute left-0 top-0 z-10"
         v-if="isAddingOption"
         @click="
            isAddingOption = false;
            inputOptionRef = '';
         "
      />
      <div class="mt-1">
         <Popover
            v-for="option in options"
            :open="option.value == optionOpenPopover"
            :key="option.value"
            :modal="true"
            v-on:update:open="
               (isOpen) => {
                  if (isOpen) {
                     inputOptionRenameRef = option.value;
                  } else {
                     optionOpenPopover = null;
                     option.value = inputOptionRenameRef;
                     inputOptionRenameRef = '';
                  }
               }
            "
         >
            <PopoverTrigger
               class="px-1 py-1 hover:bg-accent cursor-pointer flex items-center gap-1 rounded-md w-full"
               @click="optionOpenPopover = option.value"
            >
               <div>
                  <IconGripVertical class="w-4 h-4 stroke-gray-400" />
               </div>
               <p class="text-sm px-2 rounded" :style="{ backgroundColor: option.color }">
                  {{ option.value }}
               </p>
               <IconChevronRight class="ml-auto w-4 h-4 stroke-gray-300" />
            </PopoverTrigger>
            <PopoverContent class="w-[180px] p-1" align="end">
               <div class="border-b mb-2 space-y-1 pb-1">
                  <input
                     class="py-1 px-2 border border-stone-800 text-xs focus-visible:outline-none focus-visible:border-gray-500 rounded bg-transparent w-full"
                     :value="option.value"
                     @change="event => {
                        const target = event.currentTarget as HTMLInputElement
                        inputOptionRenameRef = target.value
                     }"
                  />
                  <Button
                     variant="ghost"
                     class="w-full py-1 h-auto justify-start px-1 text-red-500 hover:text-red-500"
                     @click="
                        () => {
                           const index = options.findIndex((op) => op.value == option.value);
                           options.splice(index, 1);
                        }
                     "
                  >
                     <IconTrash class="w-5 h-5 stroke-red-500" />
                     Delete
                  </Button>
               </div>
               <div>
                  <p class="text-sm text-gray-300 px-1 mb-1">Colors:</p>
                  <div
                     v-for="color in colors"
                     class="p-1 rounded-md hover:bg-accent flex items-center gap-1 cursor-pointer"
                     @click="
                        () => {
                           option.color = color.hex;
                           optionOpenPopover = null;
                        }
                     "
                  >
                     <div class="w-4 h-4 rounded" :style="{ backgroundColor: color.hex }" />
                     <p class="text-sm text-gray-300">{{ color.name }}</p>
                  </div>
               </div>
            </PopoverContent>
         </Popover>
      </div>
   </div>
</template>
<script setup lang="tsx">
import {
   IconChevronRight,
   IconGripVertical,
   IconPlus,
   IconRestore,
   IconTrash,
} from "@tabler/icons-vue";
import type { GalleryTagValue } from "~/types/fileSystem";

type PROPS = {
   uuid: string;
};
const props = defineProps<PROPS>();
const inputNameRef = ref("");
const inputOptionRef = ref("");
const inputOptionRenameRef = ref("");
const isAddingOption = ref(false);
const optionOpenPopover = ref<string | null>(null);
const galleryStore = useGalleryStore();
const galleryItem = galleryStore.editItem;
const options = ref<GalleryTagValue[]>([]);
let defaultValue = "";
const colors = [
   { hex: "#373737", name: "Light gray" },
   { hex: "#5A5A5A", name: "Gray" },
   { hex: "#603B2C", name: "Brown" },
   { hex: "#854C1D", name: "Orange" },
   { hex: "#89632A", name: "Yellow" },
   { hex: "#2B593F", name: "Green" },
   { hex: "#28456C", name: "Blue" },
   { hex: "#492F64", name: "Purple" },
   { hex: "#69314C", name: "Pink" },
   { hex: "#6E3630", name: "Red" },
];
function addOption() {
   if (!galleryStore.data) throw Error("Gallery is null");
   if (!galleryStore.data.globalData.properties) galleryStore.data.globalData.properties = [];
   const inputValue = inputOptionRef.value.trim()
   if(inputValue === "") return
   const index = galleryStore.data.globalData.properties.findIndex(
      (opt) => opt.value === inputValue,
   );
   if (index !== -1) return;
   const optionLength = galleryStore.data.globalData.properties.length;
   galleryStore.data.globalData.properties.push({
      value: inputValue,
      color: colors[optionLength % colors.length].hex,
   });
   inputOptionRef.value = "";
}

onMounted(() => {
   if (!galleryStore.data) throw Error("Gallery is null");
   if (!galleryStore.data.globalData.properties) galleryStore.data.globalData.properties = [];
   options.value = galleryStore.data.globalData.properties;
   if (!galleryItem) throw Error("Gallery edit item is null");
   const property = galleryStore.findProperty(galleryItem.uuid, props.uuid);
   if (!property) throw Error("Property is not found");
   inputNameRef.value = property.name;
   defaultValue = property.name;
});

onUnmounted(() => {
   if (!galleryItem) throw Error("Gallery Item is null");
   const index = galleryItem.properties.findIndex((property) => property.uuid == props.uuid);
   if (index === -1) throw Error(`Cannot find property with uuid ${props.uuid}`);
   galleryItem.properties[index].name = inputNameRef.value;
   galleryStore.save();
});
</script>
