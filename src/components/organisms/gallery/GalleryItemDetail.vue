<template>
   <div>
      <div class="flex gap-5 items-start">
         <ImageUploader />
         <PropertySection />
      </div>
      <div class="border rounded-lg mt-5">a</div>
   </div>
</template>

<script setup lang="ts">
import ImageUploader from "~/components/atoms/ImageUploader.vue";
import PropertySection from "./PropertySection.vue";
</script>
