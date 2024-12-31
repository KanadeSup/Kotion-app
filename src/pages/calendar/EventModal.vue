<template>
   <Dialog v-model:open="open">
      <DialogContent
         class="event-modal [&>button]:hidden flex flex-col items-stretch gap-1 px-7 w-auto"
      >
         <Input
            class="focus-visible:outline-none focus-visible:ring-0 w-[350px] focus:border-gray-400 mb-3"
            placeholder="Event name ..."
         />
         <div class="space-y-2 mb-5">
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">Repeated:</h1>
               <Select default-value="No repeat">
                  <SelectTrigger class="w-[270px]">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectItem value="No repeat">
                           No repeat
                        </SelectItem>
                        <SelectItem value="Daily">
                           Daily
                        </SelectItem>
                        <SelectItem value="Weekly">
                           Weekly
                        </SelectItem>
                        <SelectItem value="Every weekday">
                           Every weekday
                        </SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">Start at:</h1>
               <DateTimePicker trigger-class="w-[270px]" v-model:date-time-value="startAt" />
            </div>
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">End at:</h1>
               <DateTimePicker trigger-class="w-[270px]" v-model:date-time-value="endAt" />
            </div>
         </div>
         <div>
            <Button class="w-full"> Save </Button>
         </div>
         <VisuallyHidden>
            <DialogTitle />
            <DialogDescription />
         </VisuallyHidden>
      </DialogContent>
   </Dialog>
</template>

<script setup lang="ts">
import type { DateSelectArg } from "@fullcalendar/core/index.js";
import { VisuallyHidden } from "radix-vue";
import DateTimePicker from "~/components/atoms/DateTimePicker.vue";
const open = ref(false);
const startAt = ref<Date>();
const endAt = ref<Date>();
const emit = defineEmits(['close'])
function openModal(data: DateSelectArg) {
   open.value = true;
   startAt.value = data.start;
   endAt.value = data.end;
}
watch(open, (value, _)=>{
   if(value == false) {
      emit('close')
   }
})
defineExpose({ openModal });
</script>
