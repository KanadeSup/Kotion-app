<script setup lang="ts">
type ContextMenuItem = {
   name: string;
   icon: any;
   iconClass?: string
   class?: string;
   click: () => void;
};
const props = defineProps({
   items: {
      type: Array as PropType<ContextMenuItem[]>,
      required: true,
   },
})
</script>
<template>
   <ContextMenu>
      <ContextMenuTrigger>
         <slot />
      </ContextMenuTrigger>
      <ContextMenuContent class="min-w-[180px]">
         <ContextMenuItem
            v-for="item in items"
            :class="cn('justify-start cursor-pointer px-2 py-[5px] h-auto text-sm gap-2', item.class)"
            @click="item.click"
         >
            <component :is="item.icon" :class="cn('w-4 h-4 stroke-gray-300', item.iconClass)" />
            <span>{{ item.name }}</span>
         </ContextMenuItem>
      </ContextMenuContent>
   </ContextMenu>
</template>
