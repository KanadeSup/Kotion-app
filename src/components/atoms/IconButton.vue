<script setup lang="ts">
import { IconLayoutSidebar } from '@tabler/icons-vue';
const props = defineProps({
   class: {
      type: String,
      default: ''
   }
})
</script>

<template>
   <div :class="cn('flex items-center justify-center p-1 hover:bg-accent w-8 h-8 rounded cursor-pointer', props.class)">
      <slot />
   </div>
</template>
