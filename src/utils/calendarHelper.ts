import { v4 as uuidv4 } from "uuid";
import type { MyCalendarEvent, RepeatType } from "~/types/calendar";

export function generateRepeatedEvents(event: MyCalendarEvent, repeat: RepeatType) {
   if(!event.start) throw Error("Given event not has start date");
   if(!event.end) throw Error("Given event not has start date");
   if(typeof event.start != "string") throw Error("generate repeat currently only support ISO string date on event")
   if(typeof event.end != "string") throw Error("generate repeat currently only support ISO string date on event")
   const startTime = new Date(event.start)
   const endTime = new Date(event.end)

   const repeatedEvents:MyCalendarEvent[] = []

   const futureDate = new Date(event.start)
   const anchorDate = new Date(event.start)
   const groupId = uuidv4()
   if(repeat == "daily") {
      for(let i = 0; i < 60; i++) {
         futureDate.setDate(anchorDate.getDate() + i);
         const futureEvent = {...event};
         futureDate.setHours(startTime.getHours(), startTime.getMinutes());
         futureEvent.start = futureDate.toISOString();
         futureDate.setHours(endTime.getHours(), endTime.getMinutes());
         futureEvent.end = futureDate.toISOString();
         futureEvent.id = uuidv4();
         futureEvent.groupId = groupId;
         repeatedEvents.push(futureEvent);
      }
      return repeatedEvents
   }
   if(repeat == "weekly") {
      for(let i = 0; i < 12; i++) {
         futureDate.setDate(anchorDate.getDate() + i*7);
         const futureEvent = {...event};
         futureDate.setHours(startTime.getHours(), startTime.getMinutes());
         futureEvent.start = futureDate.toISOString();
         futureDate.setHours(endTime.getHours(), endTime.getMinutes());
         futureEvent.end = futureDate.toISOString();
         futureEvent.id = uuidv4();
         futureEvent.groupId = groupId;
         repeatedEvents.push(futureEvent);
      }
      return repeatedEvents
   }

   if(repeat == "weekday") {
      for(let i = 0; i < 60; i++) {
         futureDate.setDate(anchorDate.getDate() + i);
         if(futureDate.getDay() == 0 || futureDate.getDay() == 6) continue
         const futureEvent = {...event};
         futureDate.setHours(startTime.getHours(), startTime.getMinutes());
         futureEvent.start = futureDate.toISOString();
         futureDate.setHours(endTime.getHours(), endTime.getMinutes());
         futureEvent.end = futureDate.toISOString();
         futureEvent.id = uuidv4();
         futureEvent.groupId = groupId;
         repeatedEvents.push(futureEvent);
      }
      return repeatedEvents
   }
   return []
}
