<template>
   <div class="h-[51px] border-b flex items-center px-2">
      <IconButton @click="galleryStore.closeUpdatePage">
         <IconArrowLeft />
      </IconButton>
   </div>
   <div class="p-5">
      <div class="flex gap-5 items-start">
         <ImageUploader v-model:value="imageRef" />
         <PropertySection />
      </div>
      <div class="border rounded-lg mt-5">a</div>
   </div>
</template>

<script setup lang="ts">
import ImageUploader from "~/components/atoms/ImageUploader.vue";
import PropertySection from "./PropertySection.vue";
import { IconArrowLeft } from "@tabler/icons-vue";
import IconButton from "~/components/atoms/IconButton.vue";
import { saveImage } from "~/api/fileSystem";

const galleryStore = useGalleryStore();
const imageRef = ref<File | null>(null);
watch(imageRef, async (value, _) => {
   const editItem = galleryStore.editItem;
   const vaultPath = useConfigStore().vaultPath;
   if (!value || !editItem || !vaultPath) return;
   const filePath = `${vaultPath}/${value.name}`;
   const res = await saveImage(filePath, value);
   if (!res.ok) return;
   editItem.image = res.data;
   galleryStore.updateItem(editItem.id, editItem);
   galleryStore.save();
});
</script>
