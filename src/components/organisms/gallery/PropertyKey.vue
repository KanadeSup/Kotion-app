<template>
   <PropertyKeyPopover :type="type" :uuid="uuid">
      <component :is="icon" class="w-4 h-4" />
      {{ name }}
   </PropertyKeyPopover>
</template>

<script setup lang="ts">
import type { Component, PropType } from "vue";
import PropertyKeyPopover from "./popover/PropertyKeyPopover.vue";

type PROPS = {
   icon: Component,
   name: string,
   type: "text" | "tag" | "rating" | "url" | "title"
   uuid: string,
}
defineProps<PROPS>();
const popOverItem = {

}
</script>
