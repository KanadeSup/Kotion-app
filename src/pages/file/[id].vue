<template>
   <div>
      <div v-if="content !== null && content.data !== null && fileData !== null">
         <NoteEditor
            v-if="typeof content.data == 'string' || content.data.type == 'NOTE'"
            :content="typeof content.data == 'string' ? content.data : content.data.content"
            :file-data="fileData"
         />
         <Gallery
            v-else-if="typeof content.data !== 'string' && content.data.type == 'GALLERY'"
         />
      </div>
      <div v-else class="h-full w-full flex items-center justify-center">
         <div class="flex justify-center flex-col items-center border p-5 px-10 rounded-md">
            <h1 class="text-2xl font-bold mb-1">Oops !!!</h1>
            <p v-if="content == null" class="text-gray-400 font-medium">
               Somthing went wrong, please try again
            </p>
            <p v-else class="text-gray-400 font-medium">{{ content.message }}</p>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { getFileContent } from "~/api/fileSystem";
import type { File, FileContent } from "~/types/fileSystem";
import NoteEditor from "~/components/organisms/note/NoteEditor.vue";
import Gallery from "~/components/organisms/gallery/Gallery.vue";

const route = useRoute();
const fileSystemStore = useFileSystemStore();
const fileData = ref<File | null>(null);

const { data: content } = await useAsyncData("fileContentFetch", async () => {
   const idParam = route.params.id;
   if (typeof idParam !== "string") {
      return { ok: false, data: null, message: "file is not found" };
   }
   const fileEntry = fileSystemStore.getFileEntryById(Number(idParam));
   if (!fileEntry) {
      return { ok: false, data: null, message: "file is not found" };
   }
   fileData.value = fileEntry;
   const res = await getFileContent(fileEntry.absolutePath);
   if (res.ok && res.data !== null) {
      let data: string | FileContent = "";
      try {
         data = JSON.parse(res.data) as FileContent;
      } catch (e) {}
      return {
         ok: true,
         data: data,
         message: null,
      };
   }
   return { ok: false, data: null, message: res.message };
});
</script>
