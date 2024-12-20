<script setup lang="ts">
const firstPanel = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const props = defineProps({
   containerClass: {
      type: String,
      default: "",
   },
   splitterClass: {
      type: String,
      default: "",
   },
   defaultSize: {
      type: Number,
      default: 220,
   },
   minSize: {
      type: Number,
      default: 200,
   },
   maxSize: {
      type: Number,
      default: 300,
   },
   firstPanelClass: {
      type: String,
      default: "",
   },
});
const resizeData = {
   isResizing: false,
   startX: 0,
   startWidth: 0,
};
function handleMouseDown(event: MouseEvent) {
   if (event.button !== 0) return;
   resizeData.isResizing = true;
   resizeData.startX = event.x;
   resizeData.startWidth = firstPanel.value?.offsetWidth || 0;
   container.value?.classList.add("cursor-e-resize");
}
function handleMouseMove(event: MouseEvent) {
   if (!resizeData.isResizing) return;
   const newWidth = resizeData.startWidth + event.x - resizeData.startX;
   if (newWidth < props.minSize) {
      firstPanel.value!.style.width = `${props.minSize}px`;
      return;
   }
   if (newWidth > props.maxSize) {
      firstPanel.value!.style.width = `${props.maxSize}px`;
      return;
   }
   firstPanel.value!.style.width = `${resizeData.startWidth + event.x - resizeData.startX}px`;
}
function handleMouseUp(event: MouseEvent) {
   resizeData.isResizing = false;
   document.body.style.cursor = "";
   container.value?.classList.remove("cursor-e-resize");
}
</script>
<template>
   <div
      :class="cn('flex select-none w-full', containerClass)"
      ref="container"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
   >
      <div
         ref="firstPanel"
         :class="cn('flex-shrink-0', firstPanelClass)"
         :style="{
            width: defaultSize + 'px',
         }"
      >
         <slot name="first" />
      </div>
      <div
         :class="cn('w-[2px] bg-[#292524] cursor-e-resize', splitterClass)"
         @mousedown="handleMouseDown"
      />
      <div class="w-full">
         <slot name="second" />
      </div>
   </div>
</template>
