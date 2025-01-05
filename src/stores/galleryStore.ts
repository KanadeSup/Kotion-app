import { defineStore } from "pinia";
import type { File, GalleryFileContent, GalleryItem, GalleryJson } from "~/types/fileSystem";
import { saveFileContent } from "~/api/fileSystem";
import { v4 as uuidv4 } from 'uuid';

type galleryStoreState = {
   fileData: File | null;
   data: GalleryJson | null;
   isEditPageOpen: boolean;
   editItem: GalleryItem | null;
};
export const useGalleryStore = defineStore("galleryStore", {
   state: (): galleryStoreState => ({
      fileData: null,
      data: null,
      isEditPageOpen: false,
      editItem: null,
   }),
   actions: {
      set(value: GalleryJson, file: File) {
         this.data = value;
         this.fileData = file;
      },
      addItem(item: GalleryItem | null): GalleryItem {
         if (!this.data) throw Error("Gallery data is null");
         if (item === null) {
            const newItem = getNewEmptyItem();
            this.data.items.push(newItem);
            return newItem;
         }
         throw Error("The item is not null logic is not implemented");
      },
      updateItem(id: string, value: GalleryItem) {
         if (!this.data) throw Error("Gallery data is null");
         const index = this.data.items.findIndex((item) => item.id === id);
         if (index === -1) throw Error(`Cannot found item with id: ${id}`);
         this.data.items[index] = value;
      },
      async save() {
         if (!this.data) throw Error("Gallery data is null");
         if (!this.fileData) throw Error("Gallery file data is null");

         const saveData: GalleryFileContent = {
            type: "GALLERY",
            content: this.data,
         };
         saveFileContent(this.fileData.absolutePath, JSON.stringify(saveData));
      },
      openUpdatePage(id: string) {
         if (!this.data) throw Error("Gallery data is null");
         const index = this.data.items.findIndex((item) => item.id === id);
         this.isEditPageOpen = true;
         this.editItem = this.data.items[index];
      },
      closeUpdatePage() {
         this.isEditPageOpen = false;
         this.editItem = null;
      },
   },
});

function getNewEmptyItem(): GalleryItem {
   return {
      id: uuidv4(),
      properties: [
         {
            type: "title",
            name: "title",
            value: "untitled",
         },
      ],
      content: "",
      image: "",
   };
}
