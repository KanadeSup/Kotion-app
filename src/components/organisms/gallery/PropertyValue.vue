<template>
   <div class="col-span-4 text-sm">
      <!-- Text property -->
      <div v-if="['text', 'title', 'url'].includes(type)">
         <div
            v-if="!isEditEnable"
            class="col-span-4 text-sm flex items-center hover:bg-accent h-8 px-2 rounded cursor-pointer"
            @click="enableEdit"
         >
            {{ inputValue }}
         </div>
         <input
            v-if="isEditEnable"
            ref="inputRef"
            class="col-span-4 w-full bg-background border rounded-md px-1 py-1 text-sm focus-visible:outline-none focus-visible:border-gray-400 h-8 text-muted-foreground"
            v-model="inputValue"
            @blur="
               (event) => {
                  const target = event.currentTarget as HTMLInputElement | null;
                  if (!target) return;
                  isEditEnable = false;
                  inputValue = target.value;
                  emit('update', type, target.value);
               }
            "
         />
      </div>
      <!-- tag property -->
      <div v-if="type == 'tag'">
         <TagsSelector
            :default-value="value as GalleryTagValue[]"
            :select-items="galleryStore.data?.globalData.properties"
            @change="
               (values) => {
                  emit('update', type, values);
               }
            "
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import TagsSelector from "~/components/atoms/TagsSelector.vue";
import type {
   GalleryRatingValue,
   GalleryTagValue,
   GalleryTextValue,
   GalleryTitleValue,
   GalleryUrlValue,
} from "~/types/fileSystem";

type PropertyValue =
   | GalleryUrlValue
   | GalleryTextValue
   | GalleryTitleValue
   | GalleryRatingValue
   | GalleryTagValue[];
type PropertyType = "text" | "tag" | "rating" | "url" | "title";
type PROPS = {
   value: PropertyValue;
   type: PropertyType;
};
const props = defineProps<PROPS>();
const emit = defineEmits<{
   update: [type: PropertyType, value: PropertyValue];
}>();
const galleryStore = useGalleryStore();
const inputValue = ref(props.value);
const inputRef = ref<HTMLInputElement>();
const isEditEnable = ref(false);
function enableEdit() {
   isEditEnable.value = true;
   nextTick(() => {
      switch (props.type) {
         case "text":
         case "url":
         case "title": {
            inputRef.value?.focus();
            break;
         }
      }
   });
}
</script>
