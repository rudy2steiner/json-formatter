import { readFile, writeFile } from "node:fs/promises";

const patches = [
  {
    file: "node_modules/@opennextjs/cloudflare/dist/cli/build/bundle-server.js",
    from: `        legalComments: "none",
        metafile: true,`,
    to: `        legalComments: "none",
        metafile: true,
        loader: {
            ".map": "empty",
        },`,
  },
  {
    file: "node_modules/@opennextjs/aws/dist/build/helper.js",
    from: `        ...esbuildOptions,
        external: ["./open-next.config.mjs", ...(esbuildOptions.external ?? [])],`,
    to: `        ...esbuildOptions,
        loader: {
            ".map": "empty",
            ...(esbuildOptions.loader ?? {}),
        },
        external: ["./open-next.config.mjs", ...(esbuildOptions.external ?? [])],`,
  },
  {
    file: "node_modules/@opennextjs/aws/dist/build/helper.js",
    from: `        ...esbuildOptions,
        external: [
            ...(esbuildOptions.external ?? []),
            "next",
            "./open-next.config.mjs",
        ],`,
    to: `        ...esbuildOptions,
        loader: {
            ".map": "empty",
            ...(esbuildOptions.loader ?? {}),
        },
        external: [
            ...(esbuildOptions.external ?? []),
            "next",
            "./open-next.config.mjs",
        ],`,
  },
];

for (const patch of patches) {
  const source = await readFile(patch.file, "utf8");
  if (source.includes(patch.to)) {
    continue;
  }
  if (!source.includes(patch.from)) {
    throw new Error(`Could not patch ${patch.file}`);
  }
  await writeFile(patch.file, source.replace(patch.from, patch.to));
}
