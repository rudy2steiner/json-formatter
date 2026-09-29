# JSON Formatter

JSON 格式化、压缩、对比，以及时间戳换算。处理都在浏览器里完成。

站点：[jsonformatter.cn](https://jsonformatter.cn)

[English](./README.md) | 简体中文 | [日本語](./README.ja-JP.md)

## 功能

- 格式化、压缩、左右对比
- 上传、下载、清空、示例数据、自动格式化
- 折叠 JSON 数组时显示 `Array[n]`
- 时间戳与本地时间互转，支持秒、毫秒、微秒、纳秒
- 语言：简体中文（默认，路径无前缀）、English、日本語、한국어、Português、Deutsch

## 本地运行

依赖安装需要 `--legacy-peer-deps`（Fluent UI 和 React 19 的 peer 声明对不上）。不要用 cnpm，它会把 `node_modules/.bin` 拷成文件，Next 会起不来。

```bash
git clone git@github.com:rudy2steiner/json-formatter.git
cd json-formatter
npm install --legacy-peer-deps
npm run dev
```

开发服务监听 [http://localhost](http://localhost)（80 端口）。macOS 上绑 80 端口通常要管理员权限。

## 部署

部署目标是 Cloudflare Workers，走 [OpenNext](https://opennext.js.org/cloudflare)。

```bash
npx wrangler login
npm run deploy
```

`npm run preview` 会先构建，再用 wrangler 在本地跑 Worker。

## Monaco

页面加载的是 `public/monaco` 里只含 JSON 的编辑器包，不是完整的 `/vs`。改了 `src/lib/monaco-entry.ts` 之后执行：

```bash
npm run build:monaco
```

## 加一种语言

1. 在 `messages/` 里补上对应文案
2. 把 locale 加进 `src/config.ts` 和 `src/middleware.ts`
