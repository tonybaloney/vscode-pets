# Pet Park — website

A standalone website where the vscode-pets pets roam the page. It reuses the
**unmodified** rendering engine in `../../src/panel` + `../../src/common`, driven
by a small browser host (`src/main.ts`) that stands in for VS Code's
`acquireVsCodeApi()`.

## Run

```bash
pnpm dev       # dev server  → http://localhost:5173
pnpm build     # static build → dist/
pnpm preview   # serve the build
```

## How it works

The engine is host-agnostic. It needs three things, which VS Code normally
provides and `src/main.ts` provides here instead:

| Engine need | VS Code | Website (`src/main.ts`) |
|---|---|---|
| State persistence | `acquireVsCodeApi().get/setState` | `localStorage` |
| Animation clock | extension `setInterval` → `{command:'tick'}` | `setInterval` → `window.postMessage` |
| Commands (spawn/throw/…) | extension messages | control-bar buttons → `window.postMessage` |

Assets are served from `/media` via the `public/media` symlink to the repo's
`media/` folder (Vite follows it into `dist/` on build).

## Missing pets: cat, frog, bunny

These three are **hidden on purpose**. Their sprites are paid assets
(["catset"](https://seethingswarm.itch.io/catset)) that the original author
asked not to be redistributed — they ship only inside the **password-protected**
`media/extra.zip` and are git-ignored (`media/.gitignore`). If you own the
assets, drop the `cat/`, `frog/`, `bunny/` gif folders into `media/` and remove
them from the `UNAVAILABLE` set in `src/main.ts`.

## Notes

- Tailwind v4 is loaded **without preflight** (utilities only) so it doesn't
  reset the engine's own `pets.css` DOM. See `src/styles.css`.
- Changing **size** or **background theme** reloads the page: both are baked in
  at engine init, so the view is re-created (pet state is preserved in
  `localStorage` and recovered) — same approach VS Code uses. Theme backgrounds
  live in `media/backgrounds/<theme>/`; the `none` theme renders no background.
- The **Active pets** roster (top-right) reflects the engine's own pet list. It
  asks the engine via the `list-pets` command and renders the reply; the per-pet
  ✕ sends `delete-pet`. No engine state is duplicated in the UI.
