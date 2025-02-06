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
   uuid: string;
   name: string;
};

export type GalleryTitleProperty = GalleryPropertyBase & {
   type: "title";
   value: GalleryTitleValue;
};

export type GalleryTextProperty = GalleryPropertyBase & {
   type: "text";
   value: GalleryTextValue;
};

export type GalleryRatingProperty = GalleryPropertyBase & {
   type: "rating";
   value: GalleryRatingValue;
};

export type GalleryUrlProperty = GalleryPropertyBase & {
   type: "url";
   value: GalleryUrlValue;
};

export type GalleryTagValue = {
   value: string;
   color: string;
};

export type GalleryUrlValue = string;

export type GalleryTextValue = string;

export type GalleryTitleValue = string;

export type GalleryRatingValue = number;

export type GalleryPropertyValue = GalleryTagValue[] | GalleryUrlValue | GalleryTextValue | GalleryTitleValue | GalleryRatingValue

export type GalleryTagProperty = GalleryPropertyBase & {
   type: "tag";
   value: GalleryTagValue[];
};

export type GalleryProperty =
   | GalleryTitleProperty
   | GalleryTextProperty
   | GalleryRatingProperty
   | GalleryUrlProperty
   | GalleryTagProperty;

export type GalleryGlobalData = {
   properties?: GalleryTagValue[] | null;
};

export type GalleryItem = {
   uuid: string;
   properties: [GalleryTitleProperty, ...GalleryProperty[]];
   image: string;
   content: JSONContent | string;
};
export type GalleryJson = {
   globalData: GalleryGlobalData;
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
