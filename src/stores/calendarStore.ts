import { defineStore } from "pinia";
import { getFileContent, saveFileContent } from "~/api/fileSystem";
import type { MyCalendarEvent } from "~/types/calendar";


type CalendarState = {
   savedPath: string | null,
   events: MyCalendarEvent[]
}
export const useCalendarStore = defineStore("calendarStore", {
   state: ():CalendarState => ({
      savedPath: null,
      events: []
   }),
   actions: {
      async saveEvents() {
         if(!this.savedPath) throw Error("Save path is not set")
         await saveFileContent(this.savedPath, JSON.stringify(this.events))
      },
      async fetchEvents() {
         const vaultPath = useConfigStore().vaultPath;
         if(!vaultPath) throw Error("Vault path is null")
         this.savedPath = useConfigStore().vaultPath + "/" + ".calendar.json"
         const res = await getFileContent(this.savedPath)
         if(!res.ok) return []
         if(!res.data) return []
         this.events = JSON.parse(res.data)
         console.log(this.events)
      }
   },
});
