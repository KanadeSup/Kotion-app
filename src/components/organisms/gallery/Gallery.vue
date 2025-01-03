<template>
   <div class="overflow-auto h-full">
      <Header />
      <VueDraggable
         :animation="50"
         ghostClass="ghost"
         v-model="list"
         class="px-5 py-5 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-5"
      >
         <GalleryCard v-for="item in list" :key="item.id" :name="item.name" :url="item.url"/>
      </VueDraggable>
   </div>
</template>
<script setup lang="ts">
import GalleryCard from "./GalleryCard.vue";
import Header from "./Header.vue";
import { VueDraggable } from "vue-draggable-plus";

const list = ref([
   { id: 1, name: "a", url:"/galleries/123/items/1" },
   { id: 2, name: "b", url:"/galleries/123/items/1" },
   { id: 3, name: "c", url:"/galleries/123/items/1" },
   { id: 4, name: "d", url:"/galleries/123/items/1" },
   { id: 5, name: "e", url:"/galleries/123/items/1" },
   { id: 6, name: "f", url:"/galleries/123/items/1" },
   { id: 7, name: "g", url:"/galleries/123/items/1" },
]);
</script>

<style>
.ghost {
   background: #424242;
}
.ghost * {
   opacity: 0;
}
</style>
