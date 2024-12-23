<template>
   <div>
      <editor-content :editor="editor" />
   </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import type { PropType } from "vue";
import type { File } from "~/types/fileSystem";
import _ from "lodash";
import { saveFileContent } from "~/api/fileSystem";

const props = defineProps({
   content: {
      type: String,
      required: true,
   },
   fileData: {
      type: Object as PropType<File>,
      required: true,
   },
});
let isSaved = true;
const throttleSaveContent = _.throttle(async (editor) => {
   await saveFileContent(props.fileData.absolutePath, JSON.stringify(editor.getJSON()));
   isSaved = false;
}, 500);
const editor = useEditor({
   content: props.content === "" ? "" : JSON.parse(props.content),
   extensions: [StarterKit],
   editorProps: {
      attributes: {
         class: "focus:outline-none p-3 prose prose-gray prose-base prose-invert",
      },
   },
   autofocus: true,
   onUpdate: ({ editor }) => {
      isSaved = false;
      throttleSaveContent(editor);
   },
});
onUnmounted(async ()=> {
   if(isSaved == true) return
   if(editor.value){
      await saveFileContent(props.fileData.absolutePath, JSON.stringify(editor.value.getJSON()));
   }
})
onMounted(()=>{
})
</script>

<style>
.tiptap {
   margin: 0px 0px 0px 0px !important;
}
.tiptap h1 {
   font-size: 28px;
   margin: 10px 0px 10px 0px;
   font-weight: 600;
}
.tiptap h2 {
   font-size: 24px;
   margin: 10px 0px 10px 0px;
   font-weight: 600;
}
.tiptap h3 {
   font-size: 20px;
   margin: 10px 0px 10px 0px;
   font-weight: 600;
}
.tiptap h4 {
   font-size: 16px;
   margin: 10px 0px 10px 0px;
   font-weight: 600;
}
.tiptap p {
   font-size: 16px;
   font-weight: 500;
   color: #ececec;
   margin: 0;
}
.tiptap ul {
   margin: 0;
   padding-left: 19px;
}
.tiptap li {
   margin: 0;
   padding: 0;
}
</style>
