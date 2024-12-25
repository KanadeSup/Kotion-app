<template>
   <Dialog v-model:open="settingStore.isSettingModalOpen">
      <DialogContent class="[&>button]:hidden flex p-0 max-w-[1100px] max-h-full w-[70%] h-[80%] select-none gap-0 min-w-[900px] overflow-hidden">
         <Sidebar v-model:selected-component="selectedComponent"/>
         <div class="py-5 px-3 w-full">
            <component :is="selectedComponent" />
         </div>
         <VisuallyHidden>
            <DialogTitle />
            <DialogDescription />
         </VisuallyHidden>
      </DialogContent>
   </Dialog>
</template>

<script setup lang="ts">
import { VisuallyHidden } from "radix-vue";
import General from "./General.vue";
import { useSettingStore } from "./settingStore";
import Sidebar from "./Sidebar.vue";

const settingStore = useSettingStore();
const selectedComponent = shallowRef(General)
</script>
