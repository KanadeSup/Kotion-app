<template>
   <div v-if="content !== null && content.data !== null">
      <Editor :content="content.data" />
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
</template>

<script setup lang="ts">
import { getFileContent } from "~/api/fileSystem";
import Editor from "~/components/organisms/editor/Editor.vue";
const route = useRoute();
const fileSystemStore = useFileSystemStore();
const { data: content } = await useAsyncData("fileContentFetch", async () => {
   const idParam = route.params.id;
   if (typeof idParam !== "string") {
      return { ok: false, data: null, message: "file is not found" };
   }
   const fileEntry = fileSystemStore.getFileEntryById(Number(idParam));
   if (!fileEntry) {
      return { ok: false, data: null, message: "file is not found" };
   }

   const res = await getFileContent(fileEntry.absolutePath);
   return res.ok && res.data !== null
      ? { ok: true, data: res.data, message: null }
      : { ok: false, data: null, message: res.message };
});
</script>
