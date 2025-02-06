<template>
   <div class="relative">
      <div
         :class="
            cn(
               'hover:bg-accent rounded-md px-2 py-1 w-full flex justify-start items-center flex-wrap gap-2 cursor-pointer',
               props.class,
            )
         "
         @click="open = true"
      >
         <p
            v-if="valueRef?.length == 0"
            class="text-muted-foreground"
            :class="!placeholder && 'text-muted-foreground'"
         >
            {{ placeholder ? placeholder : "Empty" }}
         </p>
         <span
            v-for="item in valueRef"
            :key="item.value"
            :style="{ backgroundColor: item.color }"
            class="px-2 rounded-md flex items-center gap-1"
         >
            {{ item.value }}
            <IconX
               class="w-3 h-3 stroke-gray-300 stroke-[3px] cursor-pointer hover:stroke-white"
               @click="
                  (e) => {
                     e.stopPropagation();
                     unSelect(item);
                  }
               "
            />
         </span>
      </div>
      <div
         class="w-full border rounded-md p-1 mt-1 absolute z-50 bg-[#000000be]"
         v-if="open == true"
      >
         <div
            v-for="item in selectItems"
            v-show="valueRef.findIndex(opt => opt.value === item.value) == -1"
            :key="item.value"
            class="cursor-pointer hover:bg-accent p-1 px-3 rounded-md"
            @click="handleClickItem(item)"
         >
            <span :style="{ backgroundColor: item.color }" class="px-2 rounded-md">
               {{ item.value }}
            </span>
         </div>
         <div v-if="!selectItems || selectItems?.length === valueRef.length" class="text-muted-foreground px-2 py-1">
            There is no items
         </div>
      </div>
      <div
         v-if="open == true"
         class="w-screen h-screen fixed top-0 left-0 z-40"
         @click="open = false"
      ></div>
   </div>
</template>

<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";
import type { HTMLAttributes } from "vue";
import type { GalleryTagValue } from "~/types/fileSystem";

const props = defineProps<{
   defaultValue?: GalleryTagValue[] | null;
   selectItems?: GalleryTagValue[] | null;
   placeholder?: string;
   class?: HTMLAttributes["class"];
}>();

const open = ref(false);
const valueRef = ref<GalleryTagValue[]>(props.defaultValue ? [...props.defaultValue] : []);
const emit = defineEmits<{
   (e: "change", value: GalleryTagValue[]): void;
}>();

function handleClickItem(item: GalleryTagValue) {
   if (!props.selectItems) return;
   const index = props.selectItems.indexOf(item);
   const selectedvalue = props.selectItems[index];
   valueRef.value.push(selectedvalue);
   emit("change", valueRef.value);
}
function unSelect(item: GalleryTagValue) {
   if (!valueRef.value || valueRef.value.length == 0) return;
   const removeIndex = valueRef.value.indexOf(item);
   valueRef.value.splice(removeIndex, 1)[0];
   emit("change", valueRef.value);
}
</script>
