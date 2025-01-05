import { defineStore } from "pinia";
import {
   createDirectory,
   createFile,
   deleteEntry,
   getFileSystemNodes,
   renameEntry,
} from "~/api/fileSystem";
import type {
   Directory,
   File,
   FileSystemNode,
   GalleryFileContent,
   NoteFileContent,
} from "~/types/fileSystem";

type FileSystemState = {
   data: null | FileSystemNode[];
};
type AddActionResult = {
   isError: boolean;
   errorType: "Not Found" | "Existed" | "No Filesystem" | "Filesystem Null" | "Unknown" | null;
};
type UpdateActionResult = {
   isError: boolean;
   errorType: "Unkown" | null;
};
type UpdateData = {
   name?: string;
};

export const useFileSystemStore = defineStore("fileSystemStore", {
   state: (): FileSystemState => ({
      data: null,
   }),
   actions: {
      async fetch() {
         const res = await getFileSystemNodes();
         if (res.ok) {
            this.data = res.data;
            fileSystemSort(this.data, true);
            return true;
         }
         return false;
      },
      async add(
         dirPath: null | string,
         name: string,
         isDir: boolean,
         type: null | "NOTE" | "GALLERY" = null,
      ): Promise<AddActionResult> {
         if (this.data === null)
            return {
               isError: true,
               errorType: "Filesystem Null",
            };
         if (dirPath === null) dirPath = useConfigStore().vaultPath;
         if (dirPath === null)
            return {
               isError: true,
               errorType: "Unknown",
            };

         let res;
         if (isDir) {
            res = await createDirectory(dirPath, name);
         } else {
            let content = null;
            if (type === "GALLERY") content = createEmptyGalleryJson();
            if (type === "NOTE") content = createEmptyNoteJson();
            res = await createFile(dirPath, name, content);
         }
         if (res.data === null) {
            return {
               isError: true,
               errorType: "Unknown",
            };
         }
         const result = insertEntryToFileSystem(res.data, this.data);
         return result;
      },
      async update(entry: FileSystemNode, updateData: UpdateData): Promise<UpdateActionResult> {
         if (!updateData.name || updateData.name?.trim() === "") {
            return {
               isError: false,
               errorType: null,
            };
         }
         let res;
         if (entry.type === "directory") {
            res = await renameEntry(entry.absolutePath, updateData.name, true);
         } else {
            res = await renameEntry(entry.absolutePath, updateData.name, false);
         }
         if (res.ok) {
            this.fetch();
            return {
               isError: false,
               errorType: null,
            };
         }
         return {
            isError: true,
            errorType: "Unkown",
         };
      },
      async remove(dirPath: string) {
         const res = await deleteEntry(dirPath);
         if (res.ok) {
            this.fetch();
         }
      },
      getFileEntryById(id: number, fileSystem: FileSystemNode[] | null = null): File | null {
         if (fileSystem === null && this.data === null) {
            return null;
         }

         if (fileSystem === null) {
            fileSystem = this.data;
         }
         if (fileSystem === null) return null;
         for (const node of fileSystem) {
            if (node.type == "directory") {
               const entry = this.getFileEntryById(id, node.children);
               if (entry !== null) return entry;
               continue;
            }
            if (node.id == id) return node;
         }
         return null;
      },
   },
});

function insertEntryToFileSystem(
   insertEntry: File | Directory,
   fileSystem: FileSystemNode[],
): AddActionResult {
   const configStore = useConfigStore();
   if (insertEntry.parentDirectory === configStore.vaultPath) {
      if (isEntryExisted(insertEntry, fileSystem)) {
         return {
            isError: true,
            errorType: "Existed",
         };
      }
      fileSystem.push(insertEntry);
      fileSystemSort(fileSystem, false);
      return {
         isError: false,
         errorType: null,
      };
   }
   for (const entry of fileSystem) {
      if (entry.type == "directory" && entry.absolutePath === insertEntry.parentDirectory) {
         if (isEntryExisted(insertEntry, entry.children)) {
            return {
               isError: true,
               errorType: "Existed",
            };
         }
         entry.children.push(insertEntry);
         fileSystemSort(entry.children, false);
         return {
            isError: false,
            errorType: null,
         };
      }
      if (
         entry.type == "directory" &&
         insertEntry.parentDirectory.indexOf(entry.absolutePath) === 0
      ) {
         return insertEntryToFileSystem(insertEntry, entry.children);
      }
   }
   return {
      isError: true,
      errorType: "Not Found",
   };
}

function isEntryExisted(entry: FileSystemNode, fileSystemNodes: FileSystemNode[]) {
   for (const node of fileSystemNodes) {
      if (node.name === entry.name && node.type == entry.type) return true;
   }
   return false;
}

function fileSystemSort(fileSystem: FileSystemNode[], isDeepSort: boolean) {
   fileSystem.sort((a, b) => {
      if (a.type === "directory") return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
   });
   if (isDeepSort) {
      for (const entry of fileSystem) {
         if (entry.type === "directory") {
            fileSystemSort(entry.children, true);
         }
      }
   }
}

function createEmptyGalleryJson() {
   const galleryJson: GalleryFileContent = {
      type: "GALLERY",
      content: {},
   };
   return JSON.stringify(galleryJson);
}

function createEmptyNoteJson() {
   const galleryJson: NoteFileContent = {
      type: "NOTE",
      content: "",
   };
   return JSON.stringify(galleryJson);
}
