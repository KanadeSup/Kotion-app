<template>
   <div class="w-full rounded-lg grid grid-cols-6 items-stretch gap-2">
      <div
         class="col-span-2 text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
      >
         <IconH1 class="w-4 h-4" />
         Title
      </div>
      <Input class="col-span-4 h-auto" />
      <div v-if="!isAdding" class="col-span-2">
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
                  @click="handleAddPropClick"
               >
                  <component :is="item.icon" class="w-4 h-4" />
                  <p>{{ item.name }}</p>
               </div>
            </PopoverContent>
         </Popover>
      </div>
      <div v-else class="col-span-2">
         <input
            ref="prop-add-input"
            class="w-full bg-background border rounded-md px-1 py-1 text-sm focus-visible:outline-none focus-visible:border-gray-400 h-8 text-muted-foreground"
            @blur="handleAddPropInputBlur"
            v-model="addPropValue"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import { IconAlignLeft, IconH1, IconPlus, IconStar, IconTag } from "@tabler/icons-vue";

const isAdding = ref(false);
const addPropValue = ref("");
const propAddInput = useTemplateRef("prop-add-input");
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
function handleAddPropClick() {
   isAdding.value = true;
   addPropValue.value = ""
   nextTick(() => {
      propAddInput.value?.focus();
   });
}
function handleAddPropInputBlur() {
   isAdding.value = false;
}
</script>
