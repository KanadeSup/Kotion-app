<template>
   <PropertyKeyPopover :type="type">
      <component :is="icon" class="w-4 h-4" />
      {{ name }}
   </PropertyKeyPopover>
</template>

<script setup lang="ts">
import type { Component, PropType } from "vue";
import PropertyKeyPopover from "./popover/PropertyKeyPopover.vue";

defineProps({
   icon: Function as unknown as PropType<Component>,
   name: String,
   type: String as PropType<"text" | "tag" | "rating" | "url" | "title">,
});
const popOverItem = {

}
</script>
