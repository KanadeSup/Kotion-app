<template>
   <div class="h-[51px] border-b flex items-center px-2">
      <IconButton @click="galleryStore.closeUpdatePage">
         <IconArrowLeft />
      </IconButton>
   </div>
   <div class="p-5">
      <div class="flex gap-5 items-start">
         <ImageUploader
            v-model:value="imageRef"
            :default-img-url="galleryStore.editItem ? galleryStore.editItem.image : ''"
         />
         <PropertySection />
      </div>
      <div class="w-full h-[1px] border-b my-5" />
      <div class="rounded-lg">
         <TextEditor
            ref="editorRef"
            :content="galleryStore.editItem ? galleryStore.editItem.content : ''"
            placeholder="Write text ..."
            :onUpdated="onEditorChange"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import ImageUploader from "~/components/atoms/ImageUploader.vue";
import PropertySection from "./PropertySection.vue";
import { IconArrowLeft } from "@tabler/icons-vue";
import IconButton from "~/components/atoms/IconButton.vue";
import { saveImage } from "~/api/fileSystem";
import TextEditor from "~/components/atoms/editor/TextEditor.vue";
import type { Editor, JSONContent } from "@tiptap/core";
import _ from "lodash";

const galleryStore = useGalleryStore();
const imageRef = ref<File | null>(null);
const editorRef = ref<InstanceType<typeof TextEditor> | null>(null);
watch(imageRef, async (value, _) => {
   const editItem = galleryStore.editItem;
   const vaultPath = useConfigStore().vaultPath;
   if (!value || !editItem || !vaultPath) return;
   const filePath = `${vaultPath}/.images/${value.name}`;
   const res = await saveImage(filePath, value);
   if (!res.ok) return;
   editItem.image = res.data;
   galleryStore.updateItem(editItem.uuid, editItem);
   galleryStore.save();
});
let isSaved = true;

const throttleSaveContent = _.throttle(async (editor) => {
   const content = editor.getJSON();
   const editItem = galleryStore.editItem;
   if (!editItem) return;
   editItem.content = content;
   galleryStore.updateItem(editItem.uuid, editItem);
   galleryStore.save();
   isSaved = false;
}, 500);

function onEditorChange(editor: Editor) {
   isSaved = false;
   throttleSaveContent(editor);
}
onUnmounted(async () => {
   if (isSaved == true) return;
   const editItem = galleryStore.editItem;
   if (!editorRef.value || !editItem) return;
   const jsonContent = editorRef.value.getJsonContent();
   if (jsonContent) {
      editItem.content = jsonContent;
      galleryStore.updateItem(editItem.uuid, editItem);
      galleryStore.save();
   }
});
</script>
