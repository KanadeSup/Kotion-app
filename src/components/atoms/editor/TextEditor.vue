<template>
   <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import type { PropType } from "vue";
import type { File } from "~/types/fileSystem";
import { Editor, type JSONContent } from "@tiptap/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import "~/assets/css/editor.css";
const props = defineProps({
   content: {
      type: [String, Object] as PropType<string | JSONContent>,
      required: true,
   },
   fileData: {
      type: Object as PropType<File>,
      required: true,
   },
   onUpdated: {
      type: Function as PropType<(editor: Editor) => void>,
      required: false,
   },
});
const lowlight = createLowlight(all);
let content: string | JSONContent = "";

if (props.content === "") content = "";
else if (typeof props.content == "object") content = props.content;

const editor = useEditor({
   content: content,
   extensions: [
      StarterKit.configure({
         codeBlock: false,
      }),
      CodeBlockLowlight.configure({
         lowlight,
      }),
   ],
   editorProps: {
      attributes: {
         class: "focus:outline-none p-3 prose prose-gray prose-base prose-invert",
      },
   },
   onUpdate: ({ editor }) => {
      if (props.onUpdated) {
         props.onUpdated(editor);
      }
   },
});
function getJsonContent() {
   if (!editor.value) {
      console.error("Editor is not defined!");
      return null;
   }
   return editor.value.getJSON();
}
onMounted(() => {
   if (editor.value) {
      editor.value.commands.focus("end");
   }
});
defineExpose({ getJsonContent, editor });
</script>

<style>
.tiptap {
   max-width: none;
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
   word-break: break-all;
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
