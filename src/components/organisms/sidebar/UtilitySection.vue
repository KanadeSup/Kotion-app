<template>
   <div class="px-1 mt-3 pb-2 border-b space-y-1">
      <NuxtLink
         v-for="item of navigateItem"
         class="p-1 hover:bg-accent rounded-md flex items-center gap-2 cursor-pointer"
         :class="isActive(item.to) ? 'bg-accent' : ''"
         :to="item.to"
      >
         <component :is="item.icon" class="w-4 h-4" />
         <p class="text-sm">{{ item.name }}</p>
      </NuxtLink>
   </div>
</template>
<script setup lang="ts">
import { IconCalendar, IconLayoutKanban } from "@tabler/icons-vue";

const route = useRoute();
const isActive = (path: string) => path == route.path;

const navigateItem = [
   {
      name: "Calendar",
      icon: IconCalendar,
      to: "/calendar",
   },
   {
      name: "kaban",
      icon: IconLayoutKanban,
      to: "/",
   },
];
</script>
