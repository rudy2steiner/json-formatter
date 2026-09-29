# JSON Formatter

Format, compact, and compare JSON, and convert timestamps. Everything runs in the browser.

Site: [jsonformatter.cn](https://jsonformatter.cn)

English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md)

## Features

- Format, compact, and side-by-side compare
- Upload, download, clear, sample data, and auto-format
- A folded JSON array shows `Array[n]`
- Timestamp and local time, in seconds, milliseconds, microseconds, or nanoseconds
- Languages: 简体中文 (default, no path prefix), English, 日本語, 한국어, Português, Deutsch

## Local development

Install with `--legacy-peer-deps`. Fluent UI's peer range does not include React 19. Do not use cnpm: it copies `node_modules/.bin` instead of linking it, and Next fails to start.

```bash
git clone git@github.com:rudy2steiner/json-formatter.git
cd json-formatter
npm install --legacy-peer-deps
npm run dev
```

The dev server listens on [http://localhost](http://localhost) (port 80). Binding port 80 on macOS usually needs admin rights.

## Deploy

The app is deployed to Cloudflare Workers with [OpenNext](https://opennext.js.org/cloudflare).

```bash
npx wrangler login
npm run deploy
```

`npm run preview` builds the Worker and runs it locally with wrangler.

## Monaco

The page loads the JSON-only bundle in `public/monaco`, not the full `/vs` build. After changing `src/lib/monaco-entry.ts`:

```bash
npm run build:monaco
```

## Add a language

1. Add the strings under `messages/`
2. Register the locale in `src/config.ts` and `src/middleware.ts`
