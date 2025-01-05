import { getFileSystemNodes } from "~/api/fileSystem";
import type { Directory, File, FileSystemNode } from "~/types/fileSystem";

type modalState = {
   directoryModal: {
      isOpen: boolean;
      data: null | Directory;
      actionType: "Create" | "Update";
   };
   fileModal: {
      isOpen: boolean;
      data: null | File | Directory;
      actionType: "Create" | "Update";
      fileType: "GALLERY" | "NOTE" | null;
   };
};

export const useModalStore = defineStore("modalStore", {
   state: (): modalState => ({
      directoryModal: {
         isOpen: false,
         data: null,
         actionType: "Create",
      },
      fileModal: {
         isOpen: false,
         data: null,
         actionType: "Create",
         fileType: "NOTE",
      },
   }),
   actions: {
      openFileModal(
         actionType: "Create" | "Update",
         fileType: "NOTE" | "GALLERY" | null,
         data: FileSystemNode | null,
      ) {
         if (actionType == "Update" && data !== null && data.type === "directory")
            throw Error("Provided data should be File");
         if(actionType == "Create" && fileType == null) {
            throw Error("File modal with Create actionType should have valid value for fileType")
         }
         this.directoryModal.isOpen = false;
         this.fileModal = {
            isOpen: true,
            data: data,
            actionType,
            fileType: fileType,
         };
      },
      openDirectoryModal(actionType: "Create" | "Update", data: FileSystemNode | null) {
         if (data !== null && data.type === "file")
            throw Error("Provided data should be Directory");
         this.fileModal.isOpen = false;
         this.directoryModal = {
            isOpen: true,
            data: data,
            actionType,
         };
      },
   },
});
