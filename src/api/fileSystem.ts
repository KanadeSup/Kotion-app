import { invoke } from "@tauri-apps/api/core";
import type { Directory, File as FileType, FileSystemNode } from "@/types/fileSystem";
import type { CommandResposne } from "~/types/api";

export async function setVaultPath(path: string) {
   return (await invoke("set_vault_path_command", {
      vaultPath: path,
   })) as CommandResposne<null>;
}

export async function getVaultPath() {
   return (await invoke("get_vault_path_command")) as CommandResposne<string>;
}

export async function getFileSystemNodes() {
   const vaultPath = useConfigStore().vaultPath;
   if (vaultPath == null) {
      throw new Error("The vault path is not set. The current value is null");
   }
   return (await invoke("list_files_command", {
      vaultPath: vaultPath,
   })) as CommandResposne<FileSystemNode[]>;
}

export async function getFileContent(path: string) {
   const res = (await invoke("get_file_content_command", {
      filePath: path,
   })) as CommandResposne<string | null>;
   if (res.ok) return res as CommandResposne<string>;
   return res as CommandResposne<null>;
}

export async function saveFileContent(path: string, content: string) {
   return (await invoke("save_file_content_command", {
      filePath: path,
      content,
   })) as CommandResposne<null>;
}

// save_file_binary
export async function saveImage(path: string, data: File) {
   const buffer = await data.arrayBuffer();
   return (await invoke("save_file_binary_command", {
      filePath: path,
      data: Array.from(new Uint8Array(buffer)),
   })) as CommandResposne<string>;
}

export async function createFile(path: string, name: string, content: null | string) {
   const newNodePath = `${path}/${name}.json`;
   const res = (await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: false,
      content: content,
   })) as CommandResposne<null | number>;
   if (res.ok) {
      const fileData: FileType = {
         id: res.data!,
         type: "file",
         name: name,
         parentDirectory: path,
         absolutePath: `${path}/${name}.json`,
         extension: "json",
         fullName: `${name}.json`,
      };
      return {
         ...res,
         data: fileData,
      };
   }
   return res as CommandResposne<null>;
}

export async function createDirectory(path: string, name: string) {
   const newNodePath = `${path}/${name}`;
   const res = (await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: true,
   })) as CommandResposne<null | number>;
   if (res.ok) {
      const directoryData: Directory = {
         id: res.data!,
         type: "directory",
         name: name,
         parentDirectory: path,
         absolutePath: `${path}/${name}`,
         children: [],
      };
      return {
         ...res,
         data: directoryData,
      } as CommandResposne<Directory>;
   }
   return res as CommandResposne<null>;
}

export async function deleteEntry(path: string) {
   return (await invoke("delete_entry_command", {
      filePath: path,
   })) as CommandResposne<null>;
}

export async function renameEntry(entryPath: string, newName: string, isDir: boolean) {
   return (await invoke("rename_entry_command", {
      filePath: entryPath,
      newName: isDir ? newName : newName + ".json",
   })) as CommandResposne<null>;
}
