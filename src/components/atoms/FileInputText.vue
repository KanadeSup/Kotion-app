<template>
   <div>
      <button
         :class="
            cn(
               'text-sm p-2 border rounded-md w-full flex items-center gap-2',
               error != null
                  ? 'border-[#c42727] hover:border-[#b33737]'
                  : 'border-[#575757] hover:border-[#464646]',
               inputClass,
            )
         "
         @click="openFileDiaglog"
      >
         <span class="text-muted-foreground" v-if="value == null">
            Choose your vault location
         </span>
         <span class="text-gray-300 truncate" v-if="value !== null"> {{ value }}</span>
      </button>
      <p class="text-center text-sm text-red-500 mt-1"> {{ error }} </p>
   </div>
</template>

<script setup lang="ts">
import { open } from "@tauri-apps/plugin-dialog";
import type { PropType } from "vue";

const props = defineProps({
   inputClass: String,
   error: null as unknown as PropType<String | null>,
});
const emit = defineEmits(["change"]);

const model = defineModel("value", { type: null as unknown as PropType<String | null> });
const inputState = ref({
   directoryInputError: false,
});
async function openFileDiaglog() {
   const directoryPath = await open({
      multiple: false,
      directory: true,
   });
   if (directoryPath == null) return;
   inputState.value.directoryInputError = false;
   model.value = directoryPath;
   emit("change", directoryPath);
}
</script>
