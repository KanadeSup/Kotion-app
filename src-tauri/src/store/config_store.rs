use std::{fs, path::Path, sync::Arc};
use tauri::{AppHandle, Wry};
use tauri_plugin_store::{Store, StoreExt};
use crate::utils::xdg::{get_config_home_file_path, get_home_config_directory_path};

pub struct ConfigStore {
   allowed_keys: Vec<&'static str>,
   store: Arc<Store<Wry>>
}

#[derive(Debug)]
pub enum ConfigError {
   KeyNotAllowed(String),
}

const ALLOWED_KEYS: [&'static str; 1] = [
   "vaultPath", 
];

impl ConfigStore {
   pub fn new(app: AppHandle) -> Self {
      let file_config_path = get_config_home_file_path();
      if !Path::new(&get_home_config_directory_path()).exists() {
         let _ = fs::create_dir_all(get_home_config_directory_path());
      }
      let store = app.store(file_config_path).unwrap();
      Self { allowed_keys: ALLOWED_KEYS.to_vec(), store }
   }

   pub fn set_value(&mut self, key: &str, value: &str) -> Result<(), ConfigError> {
      if !self.allowed_keys.contains(&key) {
         Err(ConfigError::KeyNotAllowed(key.to_string()))
      } else {
         self.store.set(key, value);
         Ok(())
      }
   }

   pub fn get_value(&self, key: &str) -> Result<Option<String>, ConfigError> {
      if !self.allowed_keys.contains(&key) {
         return Err(ConfigError::KeyNotAllowed(key.to_string()))
      }
      if let Some(value) = self.store.get(key) {
         Ok(Some(value.to_string()))
      } else {
         Ok(None)
      }
   }
}