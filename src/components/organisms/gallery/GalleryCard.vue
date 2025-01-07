<template>
   <div class="border border-[#444] rounded-md overflow-hidden bg-[#0C0A09] cursor-pointer hover:border-gray-600">
      <AspectRatio :ratio="13 / 9" class="flex items-center justify-center border-b">
         <img
            v-if="data.image"
            :src="convertFileSrc(data.image)"
            class="object-cover w-full h-full"
         />
      </AspectRatio>
      <div class="p-2">
         <h1 class="font-semibold text-gray-300">{{ data.properties[0].value }}</h1>
         <div class="flex gap-2 text-sm">
            <h1 class="font-semibold text-gray-300 text-sm">Tag:</h1>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { convertFileSrc } from "@tauri-apps/api/core";
import type { PropType } from "vue";
import type { GalleryItem } from "~/types/fileSystem";
const props = defineProps({
   data: {
      type: Object as PropType<GalleryItem>,
      required: true,
   },
});
</script>
