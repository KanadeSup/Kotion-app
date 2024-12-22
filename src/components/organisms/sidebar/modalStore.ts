import { getFileSystemNodes } from "~/api/fileSystem";
import type { Directory, File, FileSystemNode } from "~/types/fileSystem";


type modalState = {
   directoryModal: {
      isOpen: boolean,
      data: null | Directory,
      actionType: "Create" | "Update"
   },
   fileModal: {
      isOpen: boolean,
      data: null | File | Directory,
      actionType: "Create" | "Update"
   },
}

export const useModalStore = defineStore("modalStore", {
   state: (): modalState => ({
      directoryModal: {
         isOpen: false,
         data: null,
         actionType: "Create"
      },
      fileModal: {
         isOpen: false,
         data: null,
         actionType: "Create"
      }
   }),
   actions: {
      openModal(modalType: "file" | "directory", actionType: "Create" | "Update", data: FileSystemNode | null) {
         if(modalType === "file") {
            if(actionType == "Update" && data !== null && data.type === "directory") throw Error("Provided data should be File")
            this.directoryModal.isOpen = false
            this.fileModal = {
               isOpen: true,
               data: data,
               actionType
            }
         } else {
            if(data !== null && data.type === "file") throw Error("Provided data should be Directory")
            this.fileModal.isOpen = false
            this.directoryModal = {
               isOpen: true,
               data: data,
               actionType
            }
         }
      }
   },
});