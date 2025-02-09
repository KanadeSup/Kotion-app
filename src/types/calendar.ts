import type { CalendarOptions, EventInput } from '@fullcalendar/core';

export type MyCalendarEvent = EventInput & {
   groupId? : null | string
}

export type MyCalendarOptions = CalendarOptions & {
   events: MyCalendarEvent[]
}

export type RepeatType = "no-repeat" | "daily" | "weekly" | "weekday"
