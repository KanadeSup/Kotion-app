<template>
   <div class="flex flex-col h-full">
      <TitleBar>
         {{ fileData?.name }}
      </TitleBar>
      <div class="h-full cursor-text" id="editorContainer" @click="handleContainerClick">
         <TextEditor
            :content="content"
            :file-data="fileData"
            ref="editorRef"
            :onUpdated="onEditorChange"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
import type { Editor, JSONContent } from "@tiptap/core";
import { saveFileContent } from "~/api/fileSystem";
import TextEditor from "~/components/atoms/editor/TextEditor.vue";
import type { File, FileContent } from "~/types/fileSystem";
import _ from "lodash";
import TitleBar from "~/components/organisms/titlebar/TitleBar.vue";
import type { PropType } from "vue";

const editorRef = ref<InstanceType<typeof TextEditor> | null>(null);
const props = defineProps({
   content: {
      type: [String, Object] as PropType<string | JSONContent>,
      default: "",
   },
   fileData: {
      type: Object as PropType<File>,
      required: true,
   },
});
let isSaved = true;

const throttleSaveContent = _.throttle(async (editor) => {
   if (!props.fileData) {
      console.error("There is no file data to identify what file contents should be saved");
      return;
   }
   const content = editor.getJSON();
   const saveContent: FileContent = {
      type: "NOTE",
      content: content,
   };
   await saveFileContent(props.fileData.absolutePath, JSON.stringify(saveContent));
   isSaved = false;
}, 500);
function onEditorChange(editor: Editor) {
   isSaved = false;
   throttleSaveContent(editor);
}
function handleContainerClick(event: MouseEvent) {
   const target = event.target as HTMLElement;
   const currentTarget = event.currentTarget as HTMLElement;
   if (target !== currentTarget) return;
   const editor = editorRef.value?.editor;
   if (!editor) return;
   editor.commands.focus("end");
}
onUnmounted(async () => {
   if (isSaved == true) return;
   if (editorRef.value) {
      const jsonContent = editorRef.value.getJsonContent();
      if (jsonContent && props.fileData) {
         const saveContent: FileContent = {
            type: "NOTE",
            content: jsonContent,
         };
         await saveFileContent(props.fileData.absolutePath, JSON.stringify(saveContent));
      }
   }
});
</script>
