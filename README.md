# Tauri 2 Svelte 5 Boilerplate with Kysely
Simple boilerplate for Tauri 2 with Svelte 5 (and DaisyUI) using Bun runtime and Kysely as ORM.

## Requirements
In order to run this boilerplate, you need to install Bun and Rust. If you are on Windows I also recommend installing MSVC before the other dependencies (make sure to check the "Desktop development with C++" workload).

Some useful links:
- https://bun.sh/docs/installation
- https://www.rust-lang.org/tools/install
- https://visualstudio.microsoft.com/vs/community/

## Setup
```
git clone https://github.com/alysonhower/tauri2-svelte5-boilerplate.git
cd tauri2-svelte5-boilerplate
bun i
```
## Useful commands
### Start dev server
```
bun run tauri dev
```

### Build executable
```
bun run tauri build
```

## Migrations
### Create

Create a new migration in `src\lib\db\migrations`, either manually or using `bun run kysely migrate:make migration_name`. Modify `up` and `down` as needed. Add it to `src\lib\db\migrations.ts`.

### Apply
Migrations in `src\lib\db\migrations.ts` will apply automatically using `hooks.client.ts` setup.


## Other links
### Svelte 5
https://svelte-omnisite.vercel.app/docs

### Tauri 2
https://tauri.app/start/

### DaisyUI
https://daisyui.com/docs/

### Kysely
https://kysely.dev/

