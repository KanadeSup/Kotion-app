<script setup lang="ts">
import { IconFile } from "@tabler/icons-vue";
import { VisuallyHidden } from "radix-vue";
import type { Directory, File } from "~/types/fileSystem";

const props = defineProps({
   type: {
      type: String as PropType<"Update" | "Create">,
      required: true,
   },
   data: {
      type: Object as PropType<File | Directory | null>,
   },
   fileType: {
      type: [String, null] as PropType<"NOTE" | "GALLERY" | null>,
      required: true,
   },
});
const open = defineModel("open", { type: Boolean, required: true });
const fileSystemStore = useFileSystemStore();
const inputData = ref({
   name: "",
});
const error = ref({
   errorInput: false,
   message: "",
});

async function onSubmit() {
   if (props.type === "Create") {
      const result = await fileSystemStore.add(
         props.data ? props.data.absolutePath : null,
         inputData.value.name,
         false,
         props.fileType,
      );
      if (!result.isError) {
         open.value = false;
         return;
      }
      if (result.errorType == "Existed") {
         error.value = {
            errorInput: true,
            message: "The file is already existed",
         };
         return;
      }
      console.error("Create file was failed:", result);
      error.value = {
         errorInput: false,
         message: "Something went wrong, please try again",
      };
      return;
   }
   if (props.type === "Update" && props.data) {
      const result = await fileSystemStore.update(props.data, {
         name: inputData.value.name,
      });
      if (!result.isError) {
         open.value = false;
         return;
      }
      console.error("update file was failed:", result);
      error.value = {
         errorInput: false,
         message: "Something went wrong, please try again",
      };
   }
}
function reset() {
   inputData.value.name = "";
   error.value.errorInput = false;
   error.value.message = "";
}
watch(open, () => {
   if (open.value == false) {
      return;
   }
   reset();
   if (props.type !== "Update" || !props.data) {
      return;
   }
   inputData.value.name = props.data.name;
});
</script>
<template>
   <Dialog v-model:open="open">
      <DialogContent class="[&>button]:hidden flex flex-col items-center gap-1 px-7 w-auto">
         <h1 v-if="type == 'Create'">What is your file name ?</h1>
         <h1 v-else>Update your file</h1>
         <p class="text-xs text-gray-400">Enter your name and choose icon</p>
         <div class="flex items-center mt-3">
            <IconFile class="w-[30px] h-[30px] rounded-l-md stroke-gray-300 border p-1" />
            <Input
               class="py-1 h-auto focus-visible:ring-0 rounded-l-none w-[250px] px-2"
               :class="error.errorInput ? 'border-red-500' : ''"
               v-model="inputData.name"
               @input="
                  error.errorInput = false;
                  error.message = '';
               "
            />
         </div>
         <p v-if="error.message !== ''" class="text-red-500 text-xs">{{ error.message }}</p>
         <div class="w-full mt-2">
            <Button class="w-full font-medium text-sm hover:bg-gray-300" @click="onSubmit">
               <p v-if="type === 'Create'">Create file</p>
               <p v-else>Save change</p>
            </Button>
         </div>
         <VisuallyHidden>
            <DialogTitle />
            <DialogDescription />
         </VisuallyHidden>
      </DialogContent>
   </Dialog>
</template>
