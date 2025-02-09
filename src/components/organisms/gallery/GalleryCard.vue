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
         <h1 class="font-medium text-gray-200 text-lg">{{ data.properties[0].value }}</h1>
         <div>
            <div v-for="property in data.properties">
               <!-- Tag property -->
               <div v-if="property.type == 'tag'" class="flex gap-2">
                  <div v-for="tag in (property.value as GalleryTagValue[])"> 
                     <div
                        class="px-2 rounded-md flex items-center gap-1"
                        :style="{ backgroundColor: tag.color }"
                     >
                        {{ tag.value }}
                     </div>
                  </div>
               </div>

               <!-- Text property -->
               <div v-if="property.type == 'text'" class="font-light text-stone-400">
                  {{ property.value }}
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
import { convertFileSrc } from "@tauri-apps/api/core";
import type { PropType } from "vue";
import type { GalleryItem, GalleryTagValue } from "~/types/fileSystem";
const props = defineProps({
   data: {
      type: Object as PropType<GalleryItem>,
      required: true,
   },
});
</script>
