type BaseFileSystem = {
   absolutePath: String;
   name: String;
};

export type File = BaseFileSystem & {
   type: "file";
   extension: String | null;
   fullName: string;
};

export type Directory = BaseFileSystem & {
   type: "directory";
   children: FileSystemNode[];
};

export type FileSystemNode = Directory | File;
