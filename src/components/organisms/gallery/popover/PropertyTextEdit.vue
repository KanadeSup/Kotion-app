<template>
   <div class="p-1 space-y-1">
      <div class="text-gray-300 text-sm">Text Property</div>
      <div class="flex gap-1">
         <Input
            class="h-auto py-1 text-sm focus-visible:ring-0 focus-visible:outline-none focus-visible:border-gray-500 rounded"
            v-model:model-value="inputValueRef"
         />
         <Button
            variant="outline"
            size="icon"
            class="shrink-0"
            :disabled="inputValueRef == defaultValue"
            @click="inputValueRef = defaultValue"
         >
            <IconRestore />
         </Button>
      </div>
   </div>
</template>

<script setup lang="tsx">
import { IconRestore } from "@tabler/icons-vue";

type PROPS = {
   uuid: string;
};
const props = defineProps<PROPS>();
const inputValueRef = ref("");
let defaultValue = "";
const galleryStore = useGalleryStore();
onMounted(() => {
   if (!galleryStore.editItem) throw Error("Gallery edit item is null");
   const property = galleryStore.findProperty(galleryStore.editItem.uuid, props.uuid);
   if (!property) throw Error("Property is not found");
   inputValueRef.value = property.name;
   defaultValue = property.name;
});
onUnmounted(() => {
   const galleryItem = galleryStore.editItem;
   if (!galleryItem) throw Error("Gallery Item is null");
   const index = galleryItem.properties.findIndex((property) => property.uuid == props.uuid);
   if (index === -1) throw Error(`Cannot find property with uuid ${props.uuid}`);
   galleryItem.properties[index].name = inputValueRef.value;
   galleryStore.save();
});
</script>
