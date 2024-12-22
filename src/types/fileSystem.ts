type BaseFileSystem = {
   id: number,
   parentDirectory: string,
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
