import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
// Repo root, so Vite is allowed to read the shared engine in ../../src.
const repoRoot = resolve(here, '../..');

export default defineConfig({
    root: here,
    plugins: [tailwindcss()],
    server: {
        fs: {
            // Allow importing engine source from outside the website folder.
            allow: [repoRoot],
        },
    },
});
