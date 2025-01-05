use crate::store::config_store::ConfigStore;
use serde::{Serialize, Serializer};
use std::{
   fs::{self, Metadata},
   os::unix::fs::MetadataExt,
   path::Path,
};
use tauri::AppHandle;

use super::CommandResult;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub enum FileSystemType {
   File,
   Directory,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FileEntry {
   id: u64,
   type_: FileSystemType,
   name: String,
   extension: String,
   parent_directory: String,
   absolute_path: String,
   full_name: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DirectoryEntry {
   id: u64,
   type_: FileSystemType,
   name: String,
   absolute_path: String,
   parent_directory: String,
   children: Option<Vec<FileSystemEntry>>,
}

pub enum FileSystemEntry {
   File(FileEntry),
   Directory(DirectoryEntry),
}

impl Serialize for FileSystemEntry {
   fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
   where
      S: Serializer,
   {
      match self {
         FileSystemEntry::File(file_entry) => file_entry.serialize(serializer),
         FileSystemEntry::Directory(directory_entry) => directory_entry.serialize(serializer),
      }
   }
}

#[tauri::command]
pub fn set_vault_path_command(app: AppHandle, vault_path: &str) -> CommandResult<()> {
   if Path::new(vault_path).exists() {
      let mut config_store = ConfigStore::new(app);
      config_store.set_value("vaultPath", vault_path).unwrap();
      return CommandResult {
         data: (),
         ok: true,
         message: None,
      };
   }

   return CommandResult {
      data: (),
      ok: false,
      message: Some("Path is invalid".to_string()),
   };
}

#[tauri::command]
pub fn get_vault_path_command(app: AppHandle) -> CommandResult<Option<String>> {
   let config_store = ConfigStore::new(app);
   return CommandResult {
      data: config_store.get_value("vaultPath").unwrap(),
      ok: true,
      message: Some("Path is invalid".to_string()),
   };
}

#[tauri::command]
pub fn list_files_command(vault_path: &str) -> CommandResult<Option<Vec<FileSystemEntry>>> {
   let entries = list_vault_files(vault_path);
   CommandResult {
      data: entries,
      ok: true,
      message: None,
   }
}
fn list_vault_files(vault_path: &str) -> Option<Vec<FileSystemEntry>> {
   let mut entries: Vec<FileSystemEntry> = Vec::new();
   if !fs::metadata(vault_path).unwrap().is_dir() {
      return None;
   }
   let paths = fs::read_dir(vault_path).unwrap();
   for path in paths {
      let path = path.unwrap().path();
      let name = path.file_stem().unwrap().to_str().unwrap().to_string();
      let absolute_path = path.to_str().unwrap().to_string();
      let is_dir = path.is_dir();
      let children = list_vault_files(&absolute_path);
      let inode_number = fs::metadata(&path).unwrap().ino();
      if is_dir {
         if name.starts_with(".") {
            continue;
         }
         let entry = DirectoryEntry {
            id: inode_number,
            type_: FileSystemType::Directory,
            name,
            parent_directory: vault_path.to_string(),
            absolute_path,
            children,
         };
         entries.push(FileSystemEntry::Directory(entry));
      } else {
         let file_extension = path
            .extension()
            .and_then(|ext| Some(ext.to_str().unwrap().to_string()));
         if file_extension == None || file_extension != Some("json".to_string()) {
            continue;
         }
         let entry = FileEntry {
            id: inode_number,
            type_: FileSystemType::File,
            name: name.clone(),
            parent_directory: vault_path.to_string(),
            absolute_path,
            extension: "json".to_string(),
            full_name: format!("{}.{}", name, "json"),
         };
         entries.push(FileSystemEntry::File(entry));
      }
   }
   Some(entries)
}

#[tauri::command]
pub fn get_file_content_command(file_path: &str) -> CommandResult<Option<String>> {
   let file_path = Path::new(file_path);
   if !file_path.exists() && file_path.is_dir() {
      return CommandResult {
         data: None,
         ok: false,
         message: Some("File is not existed".to_string()),
      };
   }
   let content = fs::read_to_string(file_path).unwrap();
   CommandResult {
      data: Some(content),
      ok: true,
      message: None,
   }
}

#[tauri::command]
pub fn save_file_content_command(file_path: &str, content: &str) -> CommandResult<()> {
   fs::write(file_path, content).unwrap();
   CommandResult {
      data: (),
      ok: true,
      message: None,
   }
}

#[tauri::command]
pub fn save_file_binary(file_path: &str, data: Vec<u8>) -> CommandResult<&str> {
   fs::write(file_path, data).unwrap();
   CommandResult {
      data: file_path,
      ok: true,
      message: None,
   }
}

#[tauri::command]
pub fn create_entry_command(
   file_path: &str,
   is_dir: bool,
   content: Option<&str>,
) -> CommandResult<Option<u64>> {
   let result = if is_dir {
      fs::create_dir_all(file_path)
   } else {
      fs::File::create(file_path).map(|_| ())
   };
   match result {
      Ok(_) => {
         if is_dir == false {
            if let Some(value) = content {
               fs::write(file_path, value).unwrap();
            }
         }
         let inode_number = fs::metadata(file_path).unwrap().ino();
         CommandResult {
            data: Some(inode_number),
            ok: true,
            message: None,
         }
      }
      Err(e) => CommandResult {
         data: None,
         ok: false,
         message: Some(e.to_string()),
      },
   }
}

#[tauri::command]
pub fn delete_entry_command(file_path: &str) -> CommandResult<()> {
   let path = fs::metadata(file_path);
   if !path.is_ok() {
      return CommandResult {
         data: (),
         ok: false,
         message: Some("Path is not valid".to_string()),
      };
   }
   let path = path.unwrap();
   if path.is_file() {
      fs::remove_file(file_path).unwrap();
   } else {
      fs::remove_dir_all(file_path).unwrap();
   }
   CommandResult {
      data: (),
      ok: true,
      message: None,
   }
}

#[tauri::command]
pub fn rename_entry_command(file_path: &str, new_name: &str) -> CommandResult<()> {
   let old_path = file_path;
   let new_path = format!("{}/{}", old_path.rsplitn(2, '/').last().unwrap(), new_name);
   if fs::rename(old_path, new_path).is_ok() {
      CommandResult {
         data: (),
         ok: true,
         message: None,
      }
   } else {
      CommandResult {
         data: (),
         ok: false,
         message: None,
      }
   }
}
