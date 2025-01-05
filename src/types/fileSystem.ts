import type { JSONContent } from "@tiptap/vue-3";
type BaseFileSystem = {
   id: number;
   parentDirectory: string;
   absolutePath: string;
   name: string;
};

export type File = BaseFileSystem & {
   type: "file";
   extension: string | null;
   fullName: string;
};

export type Directory = BaseFileSystem & {
   type: "directory";
   children: FileSystemNode[];
};

export type FileSystemNode = Directory | File;

export type GalleryJson = {

}

export type GalleryFileContent = {
   type: "GALLERY",
   content: GalleryJson
}

export type NoteFileContent = {
   type: "NOTE",
   content: JSONContent | string
}

export type FileContent = NoteFileContent | GalleryFileContent