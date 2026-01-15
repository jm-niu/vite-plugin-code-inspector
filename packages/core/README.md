<p align="center">
  <a href="https://github.com/hellof2e/vite-plugin-code-inspector">
    <img src="https://raw.githubusercontent.com/hellof2e/vite-plugin-code-inspector/988a71dca91490cf4a604c98609b24f80f7eb383/logo.svg" width="180" alt="vite-plugin-code-inspector">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-code-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/vite-plugin-code-inspector" alt="NPM Version" /></a>
  <a href="https://github.com/hellof2e/vite-plugin-code-inspector/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hellof2e/vite-plugin-code-inspector" alt="License" /></a>
</p>

<h1 align="center">
  Vite-plugin-code-inspector
</h1>

<p align="center">
  <span>简体中文 | </span>
  <a href="./README.en-US.md">
  English
  </a>
</p>

## 介绍

一个 Vite 插件，点击页面元素，IDE 直接打开对应代码文件。支持 Vue2, Vue3, React, Svelte,Angular, SSR 等任何前端工程。

<p align="center">
<img src="./preview.gif" alt="vite-plugin-vue-inspector">
</p>

## 安装

```bash

# vite-plugin-code-inspector

npm install vite-plugin-code-inspector -D
```

## 使用

### 快捷键

- Mac: Command(⌘) + Shift(⇧)
- Windows: Ctrl + Shift(⇧)

### Vite 配置

```ts
// for Vue2

import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import inspector from "vite-plugin-code-inspector";

export default defineConfig({
  plugins: [createVuePlugin(), inspector()],
});
```

```ts
// for Vue3

import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import inspector from "vite-plugin-code-inspector";

export default defineConfig({
  plugins: [Vue(), inspector()],
});
```

```ts
// for react
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inspector from "vite-plugin-code-inspector";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), inspector()],
});
```

```ts
// for preact
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import inspector from "vite-plugin-code-inspector";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), inspector()],
});
```

```ts
// for preact
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import inspector from "vite-plugin-code-inspector";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), inspector()],
});
```

### Options

```ts
inspector({
  /**
   * Toggle button visibility / 切换按钮隐藏展示
   * @default 'active'
   */
  toggleButtonVisibility?: 'always' | 'active' | 'never'

  /**
   * Default enable state
   * @default false
   */
  enabled?: boolean

  /**
   * Define a combo key to toggle inspector
   * @default 'control-shift' on windows, 'meta-shift' on other os
   *
   * any number of modifiers `control` `shift` `alt` `meta` followed by zero or one regular key, separated by -
   * examples: control-shift, control-o, control-alt-s  meta-x control-meta
   * Some keys have native behavior (e.g. alt-s opens history menu on firefox).
   * To avoid conflicts or accidentally typing into inputs, modifier only combinations are recommended.
   * You can also disable it by setting `false`.
   */
  toggleComboKey?: string | false


  /**
   * append an import to the module id ending with `appendTo` instead of adding a script into body
   * useful for frameworks that do not support trannsformIndexHtml hook (e.g. Nuxt3)
   *
   * WARNING: only set this if you know exactly what it does.
   */
  appendTo?: string | RegExp

  /**
   * Customize openInEditor host (e.g. http://localhost:3000)
   * @default false
   * @deprecated This option is deprecated and removed in 5.0. The plugin now automatically detects the correct host.
   */
  openInEditorHost?: string | false

  /**
   * lazy load inspector times (ms)
   * @default false
   */
  lazyLoad?: number | false

  /**
   * disable inspector on editor open
   * @default false
   */
  disableInspectorOnEditorOpen?: boolean

  /**
   * Hide information in VNode and produce clean html in DevTools
   *
   * Currently, it only works for Vue 3
   *
   * @default true
   */
  cleanHtml?: boolean

  /**
   * Target editor when open in editor
   *
   * @default code (Visual Studio Code)
   */
  launchEditor?: 'appcode' | 'atom' | 'atom-beta' | 'brackets' | 'clion' | 'code' | 'code-insiders' | 'codium' | 'emacs' | 'idea' | 'notepad++' | 'pycharm' | 'phpstorm' | 'rubymine' | 'sublime' | 'vim' | 'visualstudio' | 'webstorm'
})
```

## Notes

- This project is refactored and optimized from `vite-plugin-dev-inspector`.
- Integrated `launch-ide` package, supporting automatic identification and opening of various IDEs (including Antigravity, VS Code, Cursor, etc.).
- Supports the latest Vite 7.x version.
- Vite-plugin-code-inspector is inspired by [vite-plugin-vue-inspector](https://github.com/webfansplz/vite-plugin-vue-inspector), but it does not repy on front-end frameworks. It can support any front-end technology stack at the same time, such as Vue 2 & 3, React, Angular, Svelte, Nuxt and SSR.

## License

[MIT LICENSE](./LICENSE)
