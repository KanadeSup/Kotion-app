use serde::Serialize;

pub mod filesystem;

#[derive(Serialize)]
pub struct CommandResult<T> {
   data: T,
   ok: bool,
   message: Option<String>,
}
