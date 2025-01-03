<template>
   <div>
      <div class="flex gap-5 items-start">
         <div class="w-2/6 shrink-0">
            <AspectRatio :ratio="12 / 9" class="border rounded-lg"> </AspectRatio>
         </div>
         <div class="w-full rounded-lg grid grid-cols-6 items-stretch gap-2">
            <div
               class="col-span-2 text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
            >
               <IconH1 class="w-4 h-4" />
               Title
            </div>
            <Input class="col-span-4 h-auto" />

            <div
               class="col-span-2 text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
            >
               <IconPlus class="w-4 h-4" />
               Add a property
            </div>
         </div>
      </div>
      <div class="border rounded-lg mt-5">a</div>
   </div>
</template>

<script setup lang="ts">
import { IconH1, IconPlus } from "@tabler/icons-vue";
</script>
