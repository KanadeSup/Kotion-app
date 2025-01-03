<template>
   <NuxtLink :to="url" class="border border-[#444] rounded-md h-[250px] overflow-hidden bg-[#0C0A09]">
      <div class="border-b h-[150px]">
         <img :src="image" class="object-cover w-full h-full" />
      </div>
      <div class="p-2">
         <h1 class="font-semibold text-gray-300">Operation system</h1>
         <div class="flex gap-2 text-sm">
            <h1 class="font-semibold text-gray-300 text-sm">Tag:</h1>
            {{ name }}
         </div>
      </div>
   </NuxtLink>
</template>
<script setup lang="ts">
import image from "~/assets/Operating_Systems_Design_and_Implementation.jpg";
defineProps({ name: String, url: String });
</script>
