<template>
   <div class="border-b flex items-center px-3 h-[51px]">
      <h1 class="text-xl font-semibold"> Gallery </h1>
      <div class="ml-auto flex gap-2">
         <Input class="h-8 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-gray-500"/>
         <Button class="px-3 py-0 h-8"> 
            <IconPlus class="w-6 h-6"/>
            New 
         </Button>
      </div>
</div>
</template>
<script setup lang="ts">
import { IconPlus } from '@tabler/icons-vue';

</script>
