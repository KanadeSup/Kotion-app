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

export type GalleryPropertyBase = {
   name: string;
};

export type GalleryTitleProperty = GalleryPropertyBase & {
   type: "title";
   value: string;
};

export type GalleryTagProperty = GalleryPropertyBase & {
   type: "tag";
   value: string[];
};

export type GalleryProperty = GalleryTitleProperty | GalleryTagProperty;

export type GalleryItem = {
   id: string;
   properties: [GalleryTitleProperty, ...GalleryProperty[]];
   image: string;
   content: JSONContent | string;
};
export type GalleryJson = {
   items: GalleryItem[];
   setting: {};
};

export type GalleryFileContent = {
   type: "GALLERY";
   content: GalleryJson;
};

export type NoteFileContent = {
   type: "NOTE";
   content: JSONContent | string;
};

export type FileContent = NoteFileContent | GalleryFileContent;
