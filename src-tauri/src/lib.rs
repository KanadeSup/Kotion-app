mod commands;
mod utils;
mod constants;
mod store;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
   tauri::Builder::default()
      .plugin(tauri_plugin_store::Builder::new().build())
      .plugin(tauri_plugin_dialog::init())
      .setup(|app| {
         if cfg!(debug_assertions) {
            app.handle().plugin(
               tauri_plugin_log::Builder::default()
                  .level(log::LevelFilter::Info)
                  .build(),
            )?;
         }
         Ok(())
      })
      .invoke_handler(tauri::generate_handler![
         commands::filesystem::list_files_command,
         commands::filesystem::get_file_content_command,
         commands::filesystem::save_file_content_command,
         commands::filesystem::create_entry_command,
         commands::filesystem::delete_entry_command,
         commands::filesystem::rename_entry_command,
         commands::filesystem::set_vault_path_command,
         commands::filesystem::get_vault_path_command,
         commands::filesystem::save_file_binary,
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
