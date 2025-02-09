<template>
   <div class="px-2 pb-2 h-full overflow-auto">
      <div class="pt-3 flex mb-2">
         <div>
            <span class="text-2xl font-semibold"> December </span>
            <span class="text-2xl text-gray-300"> 2024 </span>
         </div>
         <div class="flex items-center ml-auto">
            <IconButton class="w-6 h-6 p-0">
               <IconChevronLeft class="w-5 h-5 stroke-[3px] stroke-gray-300" />
            </IconButton>
            <IconButton class="w-8 h-7 p-0">
               <IconRectangle class="w-5 h-5 stroke-gray-300 stroke-[3px]" />
            </IconButton>
            <IconButton class="w-6 h-6 p-0">
               <IconChevronRight class="w-5 h-5 stroke-[3px] stroke-gray-300" />
            </IconButton>
         </div>
      </div>
      <FullCalendar ref="calendar" :options="calendarOptions" />
      <EventModal 
         ref="eventModalRef"
         @close="calendar?.getApi().unselect()"
         @submit="handleSubmitEventModal"
         @delete="deleteEvent"
      />
   </div>
</template>

<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "~/assets/css/calendar.css";
import { IconChevronLeft, IconChevronRight, IconRectangle } from "@tabler/icons-vue";
import IconButton from "~/components/atoms/IconButton.vue";
import type { DateSelectArg, EventInput } from "@fullcalendar/core/index.js";
import EventModal, { type InputValue } from "./EventModal.vue";
import type { MyCalendarEvent, MyCalendarOptions } from "~/types/calendar";
import { v4 as uuidv4 } from "uuid";
import { generateRepeatedEvents } from "~/utils/calendarHelper";
import { repeat, update } from "lodash";

const eventModalRef = ref<InstanceType<typeof EventModal> | null>(null);
const calendar = ref<null|InstanceType<typeof FullCalendar>>(null);
const calendarStore = useCalendarStore()
const calendarOptions = ref<MyCalendarOptions>({
   plugins: [timeGridPlugin, interactionPlugin],
   initialView: "timeGridWeek",
   headerToolbar: {
      left: "",
      center: "",
      right: "",
   },
   allDaySlot: false,
   nowIndicator: true,
   slotLabelFormat: {
      hour: "numeric" as "numeric",
      minute: "2-digit" as "2-digit",
      omitZeroMinute: true,
      meridiem: true,
   },
   slotMaxTime: "22:00:00",
   slotMinTime: "03:00:00",
   slotDuration: "00:15:00",
   slotLabelInterval: "01:00",
   firstDay: 1,
   expandRows: true,
   contentHeight: "auto",
   selectable: true,
   select: function (info: DateSelectArg) {
      handleTimeSelect(info);
   },
   editable: true,
   unselectAuto: false,
   unselectCancel: ".event-modal",
   events: [],
   eventChange: (changeInfo) => {
      const updateEvent = calendarStore.events.find(e => e.id === changeInfo.oldEvent.id);
      if(!updateEvent) return;
      updateEvent.start = changeInfo.event.startStr;
      updateEvent.end = changeInfo.event.endStr;
      calendarStore.saveEvents();
   },
   eventClick: (eventInfo) => {
      const event = calendarStore.events.find(e => e.id == eventInfo.event.id)
      if(!event) throw Error("cannot find event with id")
      eventModalRef.value?.openUpdateModal(event)
   }
});


function handleTimeSelect(info: DateSelectArg) {
   const eventModal = eventModalRef.value;
   if (!eventModal) return;
   eventModal.openCreateModal(info);
}

function handleSubmitEventModal(values: InputValue, id?: string) {
   if(!id) {
      createEvent(values);
   } else {
      updateEvent(values, id)
   }
}
function createEvent(values: InputValue) {
   switch(values.repeat) {
      case "no-repeat":  {
         calendarStore.events.push({
            id: uuidv4(),
            title: values.name,
            start: values.startAt.toISOString(),
            end: values.endAt.toISOString(),
            backgroundColor: values.color
         })
         break;
      }
      case "weekly":
      case "weekday":
      case "daily": {
         const event: MyCalendarEvent = {
            groupId: uuidv4(),
            title: values.name,
            start: values.startAt.toISOString(),
            end: values.endAt.toISOString(),
            backgroundColor: values.color
         }
         const repeatedEvents = generateRepeatedEvents(event, values.repeat)
         repeatedEvents.forEach(repeatedEvent => {
            calendarStore.events.push(repeatedEvent)
         })
         break
      }
   }
   calendarOptions.value.events = calendarStore.events
   calendarStore.saveEvents()
}
function updateEvent(values: InputValue, id: string) {
   const updateEvent = calendarStore.events.find(e => e.id == id)
   if(!updateEvent) throw Error("cannot find event with id")
   updateEvent.title = values.name;
   updateEvent.start = values.startAt.toISOString();
   updateEvent.end = values.endAt.toISOString();
   updateEvent.backgroundColor = values.color;
   calendarStore.saveEvents()
}
function deleteEvent(id: string) {
   const deleteIndex = calendarStore.events.findIndex(e => e.id == id);
   if(deleteIndex == -1) throw Error("cannot find event with id");
   calendarStore.events.splice(deleteIndex,1);
   calendarStore.saveEvents();
}

onMounted(async ()=> {
   await calendarStore.fetchEvents();
   calendarOptions.value.events = calendarStore.events;
})
</script>

<style>
.fc-timegrid-divider {
   display: none;
}
.fc-col-header-cell-cushion {
   font-size: 12px;
   padding: 5px !important;
   font-weight: 400;
   color: var(--fc-table-header-color);
}
.fc-scrollgrid-sync-inner {
   font-size: 12px;
   color: #7a7a7a !important;
   font-weight: 700 !;
}
.fc-timegrid-slot {
   position: relative;
}
.fc-scrollgrid-shrink-cushion {
   font-size: 10px !important;
   position: absolute;
   top: -7px;
   left: 0;
   color: var(--fc-table-header-color);
   font-weight: 500;
}
table > tbody > tr:first-child > td:first-child > div > div {
   color: transparent;
}

.fc-timegrid-slot.fc-timegrid-slot.fc-timegrid-slot-minor {
   /* display: none; */
   border: none;
}
.fc-scrollgrid-shrink {
   border: none !important;
}
.fc-header-toolbar {
   margin: 0 !important;
}
</style>
