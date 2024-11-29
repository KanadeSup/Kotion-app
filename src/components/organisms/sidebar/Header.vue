<script setup lang="ts">
import { IconArrowsExchange, IconBrandApple, IconSelector, IconSettings } from '@tabler/icons-vue';
const dropDownItem = [
   {
      name: "Setting",
      icon: IconSettings,
      click: () => {
         console.log("Setting");
      }
   },
   {
      name: "Change workspace",
      icon: IconArrowsExchange,
      click: () => {
         console.log("workspace");
      }
   }
]
</script>

<template>
   <div class="flex py-2 border-b px-2">
      <DropdownMenu>
         <DropdownMenuTrigger class="w-full">
            <div class="border rounded-md w-full text-sm py-[6px] flex items-center justify-start px-2 gap-1">
               <IconBrandApple class="w-5 h-5" />
               My vault
               <IconSelector class="w-4 h-4 ml-auto stroke-gray-500" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent class="w-full dropdown-content-width-full" >
            <DropdownMenuItem v-for="item in dropDownItem" class="cursor-pointer" @click="item.click">
               <component :is="item.icon" class="w-5 h-5" />
               {{ item.name }}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   </div>
</template>