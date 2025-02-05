import { defineStore } from "pinia";
import type {
   File,
   GalleryFileContent,
   GalleryItem,
   GalleryJson,
   GalleryProperty,
   GalleryPropertyValue,
} from "~/types/fileSystem";
import { saveFileContent } from "~/api/fileSystem";
import { v4 as uuidv4 } from "uuid";

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
            const newItem = newGalleryItem();
            this.data.items.push(newItem);
            return newItem;
         }
         throw Error("The item is not null logic is not implemented");
      },
      updateItem(uuid: string, value: GalleryItem) {
         if (!this.data) throw Error("Gallery data is null");
         const index = this.data.items.findIndex((item) => item.uuid === uuid);
         if (index === -1) throw Error(`Cannot found item with id: ${uuid}`);
         this.data.items[index] = value;
      },
      addProperty(galleryUuid: string, type: string) {
         if (!this.data) throw Error("Gallery data is null");
         const newProperty = newPropertyItem(type);
         const galleryItem = this.findItem(galleryUuid)
         if(!galleryItem) throw Error(`Gallery item is not found with id: ${galleryUuid}`)
         galleryItem.properties.push(newProperty)
         return newProperty;
      },

      findItem(uuid: string) {
         if (!this.data) throw Error("Gallery data is null");
         const index = this.data.items.findIndex((item) => item.uuid === uuid);
         if (index === -1) return null;
         return this.data.items[index];
      },

      findProperty(galleryItemUuid: string, propertyUuid: string) {
         if (!this.data) throw Error("Gallery data is null");
         const galleryItem = this.findItem(galleryItemUuid)
         if(!galleryItem) return null
         const property = galleryItem.properties.find(prop => prop.uuid == propertyUuid)
         if(!property) return null
         return property
      },
      updatePropertyKey(galleryItemUuid: string, propertyUuid: string, value: GalleryPropertyValue) {
         if (!this.data) throw Error("Gallery data is null");
         const galleryItem = this.findItem(galleryItemUuid)
         if(!galleryItem) return null
         const index = galleryItem.properties.findIndex(prop => prop.uuid == propertyUuid)
         if(index === -1) return null
         galleryItem.properties[index].value = value
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
      openUpdatePage(uuid: string) {
         if (!this.data) throw Error("Gallery data is null");
         const index = this.data.items.findIndex((item) => item.uuid === uuid);
         this.isEditPageOpen = true;
         this.editItem = this.data.items[index];
      },
      closeUpdatePage() {
         this.isEditPageOpen = false;
         this.editItem = null;
      },
   },
});

function newGalleryItem(): GalleryItem {
   return {
      uuid: uuidv4(),
      properties: [
         {
            uuid: uuidv4(),
            type: "title",
            name: "title",
            value: "untitled",
         },
      ],
      content: "",
      image: "",
   };
}

function newPropertyItem(type: string): GalleryProperty {
   const uuid = uuidv4()
   switch (type.toLowerCase()) {
      case "text": {
         return {
            uuid: uuid,
            name: "property",
            type: "text",
            value: "",
         };
      }
      case "tag": {
         return {
            uuid: uuid,
            name: "property",
            type: "tag",
            value: [],
         };
      }
      case "url": {
         return {
            uuid: uuid,
            name: "property",
            type: "url",
            value: "",
         };
      }
      case "rating": {
         return {
            uuid: uuid,
            name: "property",
            type: "rating",
            value: 0,
         };
      }
      default:
         throw Error("PropertySection.vue: Property name is in valid to convert to property type");
   }
}
