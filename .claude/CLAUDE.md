# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指引。

## 常用命令

```bash
npm run dev        # 启动开发服务器（Vite HMR，地址：localhost:5173）
npm run build      # TypeScript 类型检查 + Vite 生产构建 → dist/
npm run preview    # 本地预览 dist/ 构建产物
npm run lint       # ESLint 代码检查
```

## 架构说明

本项目包含两套并行实现：

### 1. React/TypeScript 应用（`src/`）
基于 Vite+React 脚手架生成的应用。入口：`src/main.tsx` → `src/App.tsx`。

- **状态管理**：所有任务状态集中在 `App.tsx`，通过 props 向下传递。使用 `useLocalStorage` hook 持久化（`localStorage` 键名：`tasks`）。
- **类型定义**：`src/types.ts` — `Task`（id、text、completed、createdAt、priority）、`FilterType`、`Priority`。
- **组件**：平铺于 `src/components/` — `Header`、`AddTaskForm`、`FilterButtons`、`TaskList`、`TaskItem`、`ActionButtons`、`EmptyState`。
- **国际化**：`src/i18n/` — 中文语言包（UI 标签均为中文）。

### 2. 独立 HTML 应用（`index.html`）
单文件实现，样式与 Figma 移动端设计稿保持一致（375×812px 手机框架）。无需构建步骤，可直接在浏览器中打开或静态部署。

- 使用 `localStorage` 键名：`tasks-figma`
- Figma 设计令牌：主色 `#5F33E1`，字体：Lexend Deca（Google Fonts CDN）
- 任务状态流转：`todo` → `inprogress` → `done`（通过 `cycleStatus(id)` 切换）
- **部署到 GitHub Pages 的是 `index.html`，而非 React 构建产物**

**多页面结构**（CSS `transform` 滑动切换，无路由库）：
- `#page-home` — 主页（Today's Tasks）：日期选择器、筛选标签、任务列表、底部导航
- `#page-add` — 新增项目页（Add Project）：Task Group 下拉、项目名、描述、起止日期、Logo 上传
- 页面切换：`goToAddProject()` / `goBack()`；底部 FAB 加号按钮触发跳转
- 提交表单后将新项目作为任务写入 `tasks` 数组并返回主页

## GitHub Pages

仓库将 `main` 分支根目录的 `index.html` 部署至 `https://i015343.github.io/todo-app/`。

**注意**：当前环境中 `gh` CLI 已认证至 `github.tools.sap`（SAP 企业版），而非 `github.com`。如需通过 `gh` 操作 `github.com` 上的仓库，需单独认证：
```bash
gh auth login --hostname github.com
```
或直接在网页端手动开启 GitHub Pages：`https://github.com/i015343/todo-app/settings/pages`
