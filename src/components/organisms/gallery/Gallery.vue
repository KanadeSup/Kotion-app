<template>
   <div class="overflow-auto h-full">
      <div class="overflow-auto h-full" v-if="!galleryStore.isEditPageOpen">
         <Header />
         <VueDraggable
            :animation="50"
            ghostClass="ghost"
            v-model="data.items"
            class="px-5 py-5 grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-5"
         >
            <GalleryCard
               v-for="item in data.items"
               :key="item.uuid"
               :data="item"
               @click="galleryStore.openUpdatePage(item.uuid)"
            />
         </VueDraggable>
      </div>
      <div v-else>
         <GalleryItemDetail />
      </div>
   </div>
</template>
<script setup lang="ts">
import type { PropType } from "vue";
import GalleryCard from "./GalleryCard.vue";
import Header from "./Header.vue";
import { VueDraggable } from "vue-draggable-plus";
import type { File, GalleryJson } from "~/types/fileSystem";
import GalleryItemDetail from "./GalleryItemDetail.vue";

const galleryStore = useGalleryStore();
const props = defineProps({
   data: {
      type: Object as PropType<GalleryJson>,
      required: true,
   },
   fileData: {
      type: Object as PropType<File>,
      required: true,
   },
});
onMounted(() => {
   galleryStore.set(props.data, props.fileData);
});
</script>

<style>
.ghost {
   background: #424242;
}
.ghost * {
   opacity: 0;
}
</style>
