<template>
   <div class="flex flex-col h-full">
      <TitleBar>
         {{ fileData?.name }}
      </TitleBar>
      <div
         v-if="content !== null && content.data !== null && fileData !== null"
         class="h-full cursor-text"
      >
         <TextEditor
            :content="content.data"
            :file-data="fileData"
            ref="editorRef"
            :onUpdated="onEditorChange"
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
import type { Editor } from "@tiptap/core";
import { getFileContent, saveFileContent } from "~/api/fileSystem";
import TextEditor from "~/components/organisms/editor/TextEditor.vue";
import type { File } from "~/types/fileSystem";
import _ from "lodash";
import TitleBar from "~/components/organisms/titlebar/TitleBar.vue";

const route = useRoute();
const fileSystemStore = useFileSystemStore();
const fileData = ref<File | null>(null);
const editorRef = ref<InstanceType<typeof TextEditor> | null>(null);

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
   return res.ok && res.data !== null
      ? { ok: true, data: res.data, message: null }
      : { ok: false, data: null, message: res.message };
});
let isSaved = true;

const throttleSaveContent = _.throttle(async (editor) => {
   if (!fileData.value) {
      console.error("There is no file data to identify what file contents should be saved");
      return;
   }
   await saveFileContent(fileData.value.absolutePath, JSON.stringify(editor.getJSON()));
   isSaved = false;
}, 500);
function onEditorChange(editor: Editor) {
   isSaved = false;
   throttleSaveContent(editor);
}
onUnmounted(async () => {
   if (isSaved == true) return;
   if (editorRef.value) {
      const jsonContent = editorRef.value.getJsonContent();
      if (jsonContent && fileData.value) {
         await saveFileContent(fileData.value.absolutePath, JSON.stringify(jsonContent));
      }
   }
});
</script>
