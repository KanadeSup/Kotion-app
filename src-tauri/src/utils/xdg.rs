use std::env;
use crate::constants::{CONFIG_DIRECTORY_NAME, CONFIG_FILE};

/// Get configuration from user home directory by XDG_HOME_PATH.
/// If the variable is not set the DEFAULT_CONFIG_PATH will be used
pub fn get_home_config_directory_path() -> String {
   let config_path = env::var("XDG_CONFIG_HOME").unwrap_or_else(|_| get_default_config_path());
   format!("{}/{}", config_path, CONFIG_DIRECTORY_NAME)
}

/// Get configuration file from user home directory by XDG_HOME_PATH.
/// If the variable is not set the DEFAULT_CONFIG_PATH will be used
pub fn get_config_home_file_path() -> String {
   let config_path = get_home_config_directory_path();
   format!("{}/{}", config_path, CONFIG_FILE)
}

pub fn get_default_config_path() -> String {
   let home_directory_path = std::env::var("HOME").unwrap();
   format!("{}/{}", home_directory_path, ".config")
}