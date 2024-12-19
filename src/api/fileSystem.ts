import { invoke } from "@tauri-apps/api/core";
import type { Directory, File, FileSystemNode } from "@/types/fileSystem";
import type { CommandResposne } from "~/types/api";

export async function setVaultPath(path: string) {
   return await invoke("set_vault_path_command", {
      vaultPath: path,
   }) as CommandResposne<null>
}

export async function getVaultPath() {
   return await invoke("get_vault_path_command") as CommandResposne<string>
}

export async function getFileSystemNodes(): Promise<FileSystemNode[]> {
   const vaultPath = useConfigStore().vaultPath;
   if (vaultPath == null) {
      throw new Error("The vault path is not set. The current value is null");
   }
   return (await invoke("list_files_command", {
      vaultPath: vaultPath,
   })) as FileSystemNode[];
}

export async function getFileContent(path: string): Promise<string> {
   return (await invoke("get_file_content_command", {
      filePath: path,
   })) as string;
}

export async function saveFileContent(path: string, content: string): Promise<void> {
   await invoke("save_file_content_command", {
      filePath: path,
      content,
   });
}

export async function createFile(path: string, name: string): Promise<File> {
   const newNodePath = `${path}/${name}.json`;
   await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: false,
   });
   return {
      type: 'file',
      name: name,
      absolutePath: newNodePath,
      extension: "json",
      fullName: `${name}.json`,
   };
}

export async function createDirectory(path: string, name: string): Promise<Directory> {
   const newNodePath = `${path}/${name}`;
   await invoke("create_entry_command", {
      filePath: newNodePath,
      isDir: true,
   });
   return {
      type: 'directory',
      name: name,
      absolutePath: newNodePath,
      children: [],
   };
}

export async function deleteEntry(path: string): Promise<void> {
   await invoke("delete_entry_command", {
      filePath: path,
   });
}

export async function renameEntry(
   entryPath: string,
   newName: string,
   isDir: boolean,
): Promise<string> {
   await invoke("rename_entry_command", {
      filePath: entryPath,
      newName: isDir ? newName : newName + ".json",
   });
   let pathParts = entryPath.split("/");
   pathParts.pop();
   pathParts.push(newName);
   const newPath = pathParts.join("/");
   return isDir ? newPath : newPath + ".json";
}
