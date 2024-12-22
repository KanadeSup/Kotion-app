<template>
   <editor-content :editor="editor" class="border-none" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const editor = useEditor({
   content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
   extensions: [StarterKit],
   editorProps: {
      attributes: {
         class: "border-none focus:outline-none p-3 prose prose-gray prose-base prose-invert"
      }
   }
});
</script>

<style>
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