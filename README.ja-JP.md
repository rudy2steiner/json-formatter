# JSON Formatter

JSON の整形、圧縮、比較と、タイムスタンプ変換。処理はブラウザ内で完結する。

サイト：[jsonformatter.cn](https://jsonformatter.cn)

[English](./README.md) | [简体中文](./README.zh-CN.md) | 日本語

## 機能

- 整形、圧縮、左右比較
- アップロード、ダウンロード、クリア、サンプルデータ、自動整形
- 折りたたんだ JSON 配列は `Array[n]` と表示する
- タイムスタンプとローカル時刻の相互変換。秒、ミリ秒、マイクロ秒、ナノ秒
- 言語：简体中文（デフォルト、パスにプレフィックスなし）、English、日本語、한국어、Português、Deutsch

## ローカル起動

依存関係は `--legacy-peer-deps` で入れる（Fluent UI と React 19 の peer 宣言が合わない）。cnpm は使わない。`node_modules/.bin` をコピーしてしまい、Next が起動しなくなる。

```bash
git clone git@github.com:rudy2steiner/json-formatter.git
cd json-formatter
npm install --legacy-peer-deps
npm run dev
```

開発サーバーは [http://localhost](http://localhost)（ポート 80）。macOS で 80 番を使うには管理者権限が要ることが多い。

## デプロイ

Cloudflare Workers へ、[OpenNext](https://opennext.js.org/cloudflare) 経由で出す。

```bash
npx wrangler login
npm run deploy
```

`npm run preview` はビルドしたあと、wrangler で Worker をローカル実行する。

## Monaco

ページが読むのは `public/monaco` の JSON 専用バンドルで、フルの `/vs` ではない。`src/lib/monaco-entry.ts` を変えたら次を実行する。

```bash
npm run build:monaco
```

## 言語を足す

1. `messages/` に翻訳を追加する
2. `src/config.ts` と `src/middleware.ts` に locale を登録する
