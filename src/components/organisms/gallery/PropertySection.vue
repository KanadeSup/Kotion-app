<template>
   <div class="w-full">
      <div
         v-for="(property, index) in galleryStore.editItem?.properties"
         class="grid grid-cols-6 items-stretch gap-2"
      >
         <PropertyKey
            :uuid="property.uuid"
            :icon="getIconComponentByType(property.type)"
            :name="property.name"
            :type="property.type"
         />
         <PropertyValue
            :value="property.value"
            :type="property.type"
            @update="(type, value) => updatePropertyValue(index, type, value)"
         />
      </div>
      <div class="grid grid-cols-6 items-stretch gap-2">
         <div class="col-span-2">
            <Popover v-model:open="isPropertiesPopoverOpen">
               <PopoverTrigger class="w-full">
                  <div
                     class="text-muted-foreground hover:bg-accent h-8 px-1 rounded flex items-center cursor-pointer gap-1 text-sm"
                  >
                     <IconPlus class="w-4 h-4" />
                     Add a property
                  </div>
               </PopoverTrigger>
               <PopoverContent align="start" class="flex flex-col p-1 w-[150px]">
                  <div
                     v-for="item in propertyType"
                     class="flex gap-2 items-center text-sm text-gray-300 hover:bg-accent p-1 rounded-md cursor-pointer"
                     @click="handleClickPropertiesPopoverItem(item.name)"
                  >
                     <component :is="item.icon" class="w-4 h-4" />
                     <p>{{ item.name }}</p>
                  </div>
               </PopoverContent>
            </Popover>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { IconAlignLeft, IconH1, IconLink, IconPlus, IconStar, IconTag } from "@tabler/icons-vue";
import PropertyKey from "./PropertyKey.vue";
import PropertyValue from "./PropertyValue.vue";

const galleryStore = useGalleryStore();
const isPropertiesPopoverOpen = ref(false);
const propertyType = [
   {
      name: "Text",
      icon: IconAlignLeft,
   },
   {
      name: "Tag",
      icon: IconTag,
   },
   {
      name: "Rating",
      icon: IconStar,
   },
   {
      name: "Url",
      icon: IconLink,
   },
];

async function updatePropertyValue(index: number, type: string, value: any) {
   const galleryItem = galleryStore.editItem;
   const itemProperties = galleryItem?.properties;
   if (!galleryItem || !itemProperties) return;
   const updateProperty = itemProperties[index];
   updateProperty.value = value;
   galleryStore.updateItem(galleryItem.uuid, galleryItem);
   await galleryStore.save();
}

function handleClickPropertiesPopoverItem(propertyName: string) {
   isPropertiesPopoverOpen.value = false;
   const galleryItem = galleryStore.editItem;
   if (!galleryItem) throw Error("Gallery edit item is not valid");
   galleryStore.addProperty(galleryItem.uuid, propertyName.toLocaleLowerCase())
}

function getIconComponentByType(name: string) {
   switch (name.toLowerCase()) {
      case "title":
         return IconH1;
      case "text":
         return IconAlignLeft;
      case "rating":
         return IconStar;
      case "tag":
         return IconTag;
   }
   throw Error("PropertySection.vue/getIconComponentByType: type name is invalid");
}
</script>
