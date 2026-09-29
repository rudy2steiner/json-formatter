import {build} from 'esbuild';
import {rm} from 'node:fs/promises';

const outdir = 'public/monaco';

await rm(outdir, {recursive: true, force: true});

await build({
  entryPoints: ['src/lib/monaco-entry.ts'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: `${outdir}/editor.js`,
});

await build({
  entryPoints: ['node_modules/monaco-editor/esm/vs/language/json/json.worker.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: `${outdir}/json.worker.js`,
});

await build({
  entryPoints: ['node_modules/monaco-editor/esm/vs/editor/editor.worker.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  outfile: `${outdir}/editor.worker.js`,
});

await rm(`${outdir}/editor.css`, {force: true});
