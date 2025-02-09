<template>
   <Dialog v-model:open="open">
      <DialogContent
         class="event-modal [&>button]:hidden flex flex-col items-stretch gap-1 px-7 w-auto"
      >
         <Input
            class="focus-visible:outline-none focus-visible:ring-0 w-[350px] focus:border-gray-400 mb-3"
            placeholder="Event name ..."
            v-model:model-value="inputValue.name"
         />
         <div class="space-y-2">
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">Repeated:</h1>
               <Select default-value="no-repeat" @update:modelValue="value => inputValue.repeat = (value as RepeatType)">
                  <SelectTrigger class="w-[270px]">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectGroup>
                        <SelectItem value="no-repeat">
                           No repeat
                        </SelectItem>
                        <SelectItem value="daily">
                           Daily
                        </SelectItem>
                        <SelectItem value="weekly">
                           Weekly
                        </SelectItem>
                        <SelectItem value="weekday">
                           Every weekday
                        </SelectItem>
                     </SelectGroup>
                  </SelectContent>
               </Select>
            </div>
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">Start at:</h1>
               <DateTimePicker trigger-class="w-[270px]" v-model:date-time-value="inputValue.startAt" />
            </div>
            <div class="flex items-center justify-between">
               <h1 class="text-sm text-gray-300 font-semibold flex-shrink-0">End at:</h1>
               <DateTimePicker trigger-class="w-[270px]" v-model:date-time-value="inputValue.endAt" />
            </div>
         </div>
         <div class="flex justify-start gap-2 mt-2 cursor-pointer">
            <div v-for="color in colors" 
               class="w-5 h-5 rounded-full" 
               :class="inputValue.color == color ? 'border border-white' : ''" 
               :style="{backgroundColor: color}" 
               @click="inputValue.color = color"
            />
         </div>
         <div class="mt-5 flex gap-1">
            <Button class="w-full" @click="handleSave"> Save </Button>
            <Button class="bg-red-500 w-9 h-9" @click="handleDelete" v-if="modalType == 'update'"> 
               <IconTrash class="stroke-white"/> 
            </Button>
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
import { IconTrash } from "@tabler/icons-vue";
import { VisuallyHidden } from "radix-vue";
import DateTimePicker from "~/components/atoms/DateTimePicker.vue";
import type { MyCalendarEvent, RepeatType } from "~/types/calendar";
const open = ref(false);
const emit = defineEmits<{
   (e: 'submit', inputValue: InputValue, id?: string): void
   (e: 'delete', id: string): void
   (e: 'close'): void
}>()
const updateEventId = ref<string>()
const modalType = ref<"update" | "create">("create")
const colors = [
   "#606260",
   "#3283D5",
   "#D2832D",
   "#41C95F",
   "#D34F58",
   "#40C8C8",
   "#4040CA",
   "#8B41D3",
   "#85C940",
]

export type InputValue = {
   repeat: RepeatType,
   name: string,
   startAt: Date,
   endAt: Date,
   color: string,
}

const inputValue = ref<InputValue>({
   repeat: "no-repeat",
   name: "",
   startAt: new Date(),
   endAt: new Date(),
   color: colors[0],
})

function openCreateModal(data: DateSelectArg) {
   open.value = true;
   modalType.value = "create"
   inputValue.value.name = "";
   inputValue.value.color = colors[0];
   inputValue.value.startAt = data.start;
   inputValue.value.endAt = data.end; 
   updateEventId.value = undefined;
}
function openUpdateModal(data: MyCalendarEvent) {
   open.value = true;
   modalType.value = "update"
   if(!data.title) throw Error("Title event is null");
   if(!data.start) throw Error("Start event is null");
   if(!data.end) throw Error("End event is null");
   if(!data.backgroundColor) throw Error("background color event is null");
   inputValue.value.name = data.title;
   inputValue.value.startAt = new Date(data.start as "string");
   inputValue.value.endAt = new Date(data.end as "string");
   inputValue.value.color = data.backgroundColor;
   updateEventId.value = data.id;
}

watch(open, (value, _)=>{
   if(value == false) {
      emit('close')
   }
})

function handleSave() {
   if(inputValue.value.name.trim() == "") return
   emit('submit', inputValue.value, updateEventId.value);
   open.value = false;
}
function handleDelete() {
   if(!updateEventId.value) return
   emit('delete', updateEventId.value)
   open.value = false;
}

defineExpose({ openCreateModal, openUpdateModal });
</script>
