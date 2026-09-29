
# JSON Home
JSON Home is an open-source project that simplifies video creation by allowing users to generate videos online with OpenAI's Sora model using text, featuring easy one-click website deployment.
👉 [SoraWebui](https://jsonformatter.cn) 

English | [简体中文](https://github.com/rudy2steiner/SoraWebui/blob/main/README.zh-CN.md) | [日本語](https://github.com/SoraWebui/SoraWebui/blob/main/README.ja-JP.md)


# Project Plan
- ✅ Generate video by words(Use [FakeSoraAPI](https://github.com/rudy2steiner/FakeSoraAPI)):

  You can see this feature in 👉 [main](https://github.com/rudy2steiner/SoraWebui/tree/main) or 👉 [version-0.1](https://github.com/SoraWebui/SoraWebui/tree/version-0.1)

- ✅ Login with Google:

  You can see this feature in 👉 [login](https://github.com/rudy2steiner/SoraWebui/tree/login) or 👉 [version-0.2](https://github.com/SoraWebui/SoraWebui/tree/version-0.2)

- ✅ Google One Tap Login:

  You can see this feature in 👉 [login](https://github.com/rudy2steiner/SoraWebui/tree/login) or 👉 [version-0.3](https://github.com/SoraWebui/SoraWebui/tree/version-0.3)

- [ ] Stripe payment：

  Coming soon

- [ ] Add OpenAI’s Sora API：

  Waiting for OpenAI launch Sora's API, then we will launch this feature.


## Quick Started

### Deploy on Cloudflare Workers

This app runs on Cloudflare Workers via the [OpenNext](https://opennext.js.org/cloudflare) Cloudflare adapter.

```bash
# 1. Authenticate wrangler (one-time)
npx wrangler login

# 2. Set the OpenAI API key as a secret (other vars live in wrangler.jsonc)
npx wrangler secret put OPENAI_API_KEY

# 3. Build + deploy
npm run deploy
```

Other useful scripts:

- `npm run preview` — build and run the Worker locally with `wrangler dev`.
- `npm run dev` — run the regular Next.js dev server.

Local Worker dev reads secrets from a `.dev.vars` file. Copy `.dev.vars.example` to `.dev.vars` and fill in values. Public/non-secret vars (`OPENAI_API_MODEL`, `OPENAI_API_BASE_URL`) are configured in `wrangler.jsonc`.

### 1. Clone project

```bash
git clone git@github.com:rudy2steiner/jsonhome.git
```

### 2. Install dependencies

```bash
cd SoraWebui && yarn
#or
cd SoraWebui && npm install
#or
cd SoraWebui && pnpm install
```

### 3. copy .env.example and rename it to .env.local

```bash
# website URL
NEXT_PUBLIC_SITE_URL=http://localhost

# openai config
OPENAI_API_KEY=sk-XXXXXX
OPENAI_API_BASE_URL=http://localhost:8081
OPENAI_API_MODEL=sora-1.0-turbo
```

### 4. Run it

```bash
yarn dev
#or
npm run dev
#or
pnpm dev
```
### Monaco editor
```agsl
https://www.npmjs.com/package/@monaco-editor/react
loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.1/min/vs' } })
loader.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } });
```
### timestamp
``` 

```
### i18n
``` 
IN
US
BR
UK
VN
DE
```
#### add lang 
* translate messages
* config.ts
* middleware
### 5. Open [http://localhost](http://localhost) with your browser to see it.
![success_deploy.jpg](https://sorawebui.com/success_deploy.jpg)


# Important
SoraWebui requires [FakeSoraAPI](https://github.com/SoraWebui/FakeSoraAPI) to function properly.


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=SoraWebui/SoraWebui&type=Date)](https://star-history.com/#SoraWebui/SoraWebui&Date)
