<template>
   <label
      for="image-input"
      :class="cn('w-2/6 shrink-0 border rounded-lg  cursor-pointer hover:bg-accent', props.class)"
   >
      <AspectRatio :ratio="12 / 9" class="flex items-center justify-center">
         <IconUpload class="w-9 h-9 text-gray-400" v-if="!imgUrl"/>
         <div v-else class="w-full h-full">
            <img :src="imgUrl" 
               class="object-cover  w-full h-full"
            />
         </div>
      </AspectRatio>
      <input
         type="file"
         id="image-input"
         class="hidden"
         accept="image/*"
         @change="handleFileChange"
      />
   </label>
</template>

<script setup lang="ts">
import { IconUpload } from "@tabler/icons-vue";
import type { HTMLAttributes, PropType } from "vue";

type PROPS = {
   class?: HTMLAttributes["class"];
};
const props = defineProps<PROPS>();
const model = defineModel("value", {
   type: Object as PropType<File>,
});
const imgUrl = ref("")

function handleFileChange(event: Event) {
   const input = event.target as HTMLInputElement;
   if (input.files && input.files[0]) {
      model.value = input.files[0];
      imgUrl.value = URL.createObjectURL(input.files[0]);
   }
}
</script>
