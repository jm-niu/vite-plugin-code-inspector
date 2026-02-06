# 🚀 Vite-plugin-code-inspector 开发指南

欢迎参与 `vite-plugin-code-inspector` 的开发！这份文档将帮助你快速了解项目并开始贡献代码。

## 📦 项目架构

本项目是一个基于 `pnpm workspace` 的 Monorepo 架构，主要分为核心逻辑和示例演示两部分：

```text
vite-plugin-code-inspector/
├── packages/
│   ├── core/              # 核心插件包
│   │   ├── src/
│   │   │   ├── index.ts        # 插件入口，负责 Vite 钩子集成
│   │   │   ├── server.ts       # 服务端逻辑，处理打开编辑器请求（基于 launch-ide）
│   │   │   ├── compiler/       # 编译时逻辑，注入 data-v-inspector 属性
│   │   │   ├── overlay.js      # 浏览器端 UI 和交互逻辑
│   │   │   └── load.js         # 浏览器端加载脚本
│   │   └── tsup.config.ts      # 构建配置
│   └── playground/        # 示例项目（用于联调测试）
│       ├── react/              # Vite 7 + React 示例
│       ├── vue2/               # Vue 2 示例
│       └── vue3/               # Vue 3 示例
└── package.json           # 根目录脚本
```

## 🛠️ 环境准备

1. **安装 pnpm**:

   ```bash
   npm install -g pnpm
   ```

2. **安装依赖**:
   ```bash
   pnpm install
   ```

## 💻 开发工作流

为了实时看到代码修改的效果，建议开启多窗口开发模式：

### 1. 开启核心包监听

在根目录下运行，这会启动 `tsup --watch`，实时编译 `packages/core` 到 `dist` 目录：

```bash
pnpm dev
```

### 2. 运行示例项目

在另一个终端运行你想要调试的示例：

```bash
pnpm play:react   # 测试 React/Vite 7 兼容性
# 或
pnpm play:vue3    # 测试 Vue 3
```

### 3. 调试流程

- **修改服务端逻辑** (`core/src/index.ts` 或 `core/src/server.ts`): 修改后 `tsup` 会自动重构。由于示例项目（如 Vue 3）可能配置了 `nodemon` 监听 `dist`，Vite 会自动重启。
- **修改前端 UI** (`core/src/overlay.js`): 由于该文件是直接作为源码引用的，修改后只需刷新浏览器即可生效。

## 核心原理解析

### 1. 编译时注入 (Compile-time)

插件通过 `transform` 钩子，使用 `@vue/compiler-dom` (Vue) 或 `babel` (JSX) 在每个 DOM 元素上注入 `data-v-inspector` 属性，格式为 `文件路径:行号:列号`。

### 2. 浏览器端交互 (Runtime)

`overlay.js` 会在页面注入一个 Web Component (`<dev-inspector>`)。

- 用户按下快捷键时进入检查模式。
- 点击元素时，解析其 `data-v-inspector` 属性。
- 向服务端发送请求：`fetch('/__open-in-editor?file=...')`。

### 3. 编辑器打开 (Server-side)

在 `server.ts` 中，我们通过 `configureServer` 挂载了中间件，拦截 `/__open-in-editor` 请求：

- 使用 `launch-ide` 包自动识别并打开当前运行的编辑器。
- 原生支持 **Antigravity (agy)**, VSCode, Cursor, WebStorm 等多种 IDE。

## ⌨️ 常用开发任务

### 如何支持新的编辑器？

由于我们集成了 `launch-ide`，大部分主流编辑器已自动支持。如果需要针对特定编辑器做特殊处理，可以在 `packages/core/src/server.ts` 的 `openInEditor` 函数中添加逻辑。

### 如何更新 UI 样式？

编辑 `packages/core/src/overlay.js` 中的 `template.innerHTML`。所有样式都在 `:host` 的 shadow DOM 中定义，不会污染用户项目的样式。

## 🧪 兼容性要求

- **Vite 版本**: 支持 2.x, 3.x, 4.x, 5.x, 6.x 以及最新的 **7.x**。
- **Node.js**: 推荐 v18+。

## 🚀 构建与发布

1. **全量构建**:

   ```bash
   pnpm build
   ```

2. **发布新版本**:
   项目使用 `changesets` 管理版本：
   ```bash
   npx changeset        # 添加变更说明
   npx changeset version # 更新版本号
   pnpm release         # 发布到 npm
   ```
   或者直接发布到 npm
   ```bash
   cd packages/core
   npm publish --access public
   ```
