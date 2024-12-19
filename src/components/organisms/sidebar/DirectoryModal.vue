<script setup lang="ts">
import { IconFolder } from "@tabler/icons-vue";
import { VisuallyHidden } from "radix-vue";

const open = defineModel("open", { type: Boolean, required: true });
</script>
<template>
   <Dialog v-model:open="open">
      <DialogContent class="[&>button]:hidden flex flex-col items-center gap-1 px-7 w-auto">
         <h1>What is your directory name ?</h1>
         <p class="text-xs text-gray-400">Enter your name and choose icon</p>
         <div class="flex items-center mt-3">
            <IconFolder class="w-[30px] h-[30px] rounded-l-md stroke-gray-300 border p-1" />
            <Input class="py-1 h-auto focus-visible:ring-0 rounded-l-none w-[250px] px-2" />
         </div>
         <div class="w-full mt-2">
            <Button class="w-full font-medium text-sm hover:bg-gray-300">Create directory</Button>
         </div>
         <VisuallyHidden>
            <DialogTitle />
            <DialogDescription />
         </VisuallyHidden>
      </DialogContent>
   </Dialog>
</template>
