import { invoke } from "@tauri-apps/api/core";
import type { Directory, File, FileSystemNode } from "@/types/fileSystem";
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
   return (await invoke("get_file_content_command", {
      filePath: path,
   })) as CommandResposne<string>;
}

export async function saveFileContent(path: string, content: string) {
   return (await invoke("save_file_content_command", {
      filePath: path,
      content,
   })) as CommandResposne<null>;
}

export async function createFile(path: string, name: string) {
   const newNodePath = `${path}/${name}.json`;
   const res = (await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: false,
   })) as CommandResposne<File>;
}

export async function createDirectory(path: string, name: string) {
   const newNodePath = `${path}/${name}`;
   (await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: true,
   })) as CommandResposne<Directory>;
}

export async function deleteEntry(path: string) {
   return (await invoke("delete_entry_command", {
      filePath: path,
   })) as CommandResposne<null>;
}

export async function renameEntry(entryPath: string, newName: string, isDir: boolean) {
   return await invoke("rename_entry_command", {
      filePath: entryPath,
      newName: isDir ? newName : newName + ".json",
   }) as CommandResposne<null>;
}
