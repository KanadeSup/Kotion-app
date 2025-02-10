<script setup lang="ts">
import { getLocalTimeZone, type DateValue } from "@internationalized/date";
import { format } from "date-fns";
import { IconCalendar } from "@tabler/icons-vue";
import { ref, type PropType } from "vue";
const props = defineProps({
   triggerClass: String,
});
const dateTimeValue = defineModel("dateTimeValue", { type: Object as PropType<Date>, default: new Date() });
const dateValue = ref() as Ref<DateValue | undefined>;
const timeValue = ref<string>();
const timeRange = ref(generateTimeRange("03:00", "22:00", 15));
if(dateTimeValue) {
   dateValue.value =  toCalendarDate(dateTimeValue.value);
   timeValue.value = format(dateTimeValue.value, "hh:mm a");

}
function generateTimeRange(start: string, end: string, interval: number): string[] {
   const startTime = new Date(`2000-01-01T${start}:00`);
   const endTime = new Date(`2000-01-01T${end}:00`);
   const times: string[] = [];
   while (startTime <= endTime) {
      times.push(format(startTime, "HH:mm a"));
      startTime.setMinutes(startTime.getMinutes() + interval);
   }
   return times;
}

function selectTime(event: MouseEvent) {
   const target = event.target as HTMLElement;
   if (!target.classList.contains("time")) return;
   const value = target.textContent;
   if (!value) return;
   timeValue.value = value;
}
watch([dateValue, timeValue], (values) => {
   const date = values[0]
   const time = values[1]
   if(!date || !time) return
   const hours = Number(time.split(":")[0])
   const minutes =  Number(time.split(":")[1])
   dateTimeValue.value = new Date(date.year, date.month, date.day, hours, minutes)
})
</script>

<template>
   <Popover>
      <PopoverTrigger as-child>
         <Button
            variant="outline"
            :class="
               cn(
                  'w-full justify-start text-left font-normal px-2 gap-0',
                  (!dateValue || !timeValue) && 'text-muted-foreground',
                  triggerClass,
               )
            "
         >
            <IconCalendar class="mr-2 h-4 w-4" />
            {{
               dateValue && timeValue
                  ? `${format(dateValue.toDate(getLocalTimeZone()), "dd-MM-yyyy")} &nbsp;&nbsp;${timeValue}`
                  : "Pick a date & time"
            }}
         </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0 flex">
         <Calendar v-model="dateValue" initial-focus />
         <div class="pt-[15px] pr-2 text-sm">
            <div class="p-1 px-2 w-[110px] rounded-md border mb-3">
               {{ timeValue ? timeValue : "Time" }}
            </div>
            <ScrollArea class="h-[215px] space-y-[3px]" @click="selectTime">
               <div
                  class="time p-1 px-2 hover:bg-accent rounded-md cursor-pointer"
                  :class="time == timeValue ? 'bg-accent' : ''"
                  v-for="time in timeRange"
               >
                  {{ time }}
               </div>
            </ScrollArea>
         </div>
      </PopoverContent>
   </Popover>
</template>
