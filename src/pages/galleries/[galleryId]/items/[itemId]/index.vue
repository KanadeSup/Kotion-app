<template>
   <div>
      <div class="h-[51px] border-b flex items-center px-2">
         <IconButton>
            <IconArrowLeft />
         </IconButton>
      </div>
      <div class="p-5">
         <InformationSection />
      </div>
   </div>
</template>
<script setup lang="ts">
import { IconArrowLeft } from "@tabler/icons-vue";
import IconButton from "~/components/atoms/IconButton.vue";
import InformationSection from "./InformationSection.vue";
</script>
