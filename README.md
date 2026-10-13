# xuanan-frontend

基于 Vue 3 的答题应用平台前端。用户可以创建、发布答题应用（得分类 / 测评类），其他用户在线作答并由后台按自定义规则或 AI 策略评分，同时提供用户、题目、评分、回答等后台管理能力和数据统计能力。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3（`<script setup>` 组合式 API）、TypeScript |
| 构建 | Vue CLI 5（webpack）、Babel |
| UI 组件库 | Arco Design Vue 2 |
| 样式 | Tailwind CSS 4、Inspira UI 插件、PostCSS、Autoprefixer |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| 请求 | Axios（统一封装拦截器） |
| 图表 | ECharts 6、vue-echarts |
| 编辑器 | ByteMD（Markdown 编辑 / 预览） |
| 其他 | qrcode（分享二维码）、@vueuse/core、@vueuse/motion |
| 接口代码生成 | @umijs/openapi（根据后端 Swagger 文档生成 `src/api`） |
| 代码规范 | ESLint + Prettier |

## 功能概览

### 应用浏览与使用

- 首页分页展示已通过审核的应用，支持按名称搜索。
- 应用详情页展示应用信息、题目与评分结果，支持复制链接、扫码分享。
- 在线答题：分页作答、上一题 / 下一题切换、作答进度校验，提交后跳转结果页。
- 答题结果页根据评分策略展示得分或测评结论。
- 「我的答题」查看个人历史作答记录。

### 应用创建与维护

- 创建 / 修改应用：填写应用名称、描述、封面、类型（得分类、测评类）、评分策略（自定义、AI）。
- 题目管理：手动添加题目与选项，或使用 AI 生成题目。
- 评分结果管理：维护各分数区间 / 结果类型对应的自定义结果，支持表格化配置。
- AI 生成题目：支持一次性生成和 SSE 实时流式生成两种方式，可指定题目数量与选项数量。

### 管理与统计

- 用户管理、应用管理（含审核）、题目管理、评分管理、回答管理。
- 应用统计：热门应用答题数量柱状图、按 appId 查询的答题结果分布饼图。

### 权限体系

- 路由级权限控制，权限枚举定义于 `src/access/accessEnum.ts`：`notLogin`（游客）、`user`（普通用户）、`admin`（管理员）。
- 全局前置守卫 `src/access/index.ts` 在进入页面前拉取登录用户信息并校验 `meta.access`，未登录跳转登录页（携带 `redirect` 参数），权限不足跳转 `/noAuth`。
- 菜单项根据当前用户权限动态过滤。

### 界面体验

- 引入流体光标特效（`src/components/FluidCursor.vue`）应用于首页与应用创建页。
- 响应式栅格列表、渐变内容容器、Arco 与 Tailwind 混合样式体系。

## 目录结构

```
xuanan-frontend
├── public/                     # 静态资源与 HTML 模板
├── src
│   ├── access/                 # 权限枚举、校验函数与全局路由守卫
│   ├── api/                    # 由 OpenAPI 文档生成的接口定义（typings.d.ts 为类型声明）
│   ├── assets/                 # 全局样式（tailwind.css）与图片
│   ├── components/             # 通用组件：全局头部、应用卡片、Markdown 编辑器 / 预览器、
│   │                           # 图片上传、分享弹窗、流体光标
│   ├── constant/               # 业务枚举与映射（审核状态、应用类型、评分策略）
│   ├── layouts/                # 基础布局（主站）与用户布局（登录 / 注册）
│   ├── lib/                    # 工具函数
│   ├── router/                 # 路由入口 routes.ts 与实例 index.ts
│   ├── store/                  # Pinia 状态（登录用户）
│   ├── views/                  # 页面
│   │   ├── HomePage.vue        # 首页
│   │   ├── add/                # 创建 / 修改应用、题目、评分结果
│   │   ├── admin/              # 后台管理页面
│   │   ├── answer/             # 答题、答题结果、我的答题
│   │   ├── app/                # 应用详情
│   │   ├── statistic/          # 应用统计
│   │   └── user/               # 登录、注册
│   ├── App.vue
│   ├── main.ts                 # 应用入口（注册 Arco、Pinia、Router、权限守卫）
│   └── request.ts              # Axios 实例与请求 / 响应拦截器
├── openapi.config.ts           # OpenAPI 接口代码生成配置
├── tailwind.config.js
├── tsconfig.json
└── vue.config.js
```

## 环境要求

- Node.js 16 及以上（Vue CLI 5 与 Tailwind CSS 4 要求现代 Node 版本）
- npm
- 可访问的后端服务，默认地址 `http://localhost:8101`

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器（默认 http://localhost:8080，支持热更新）：

```bash
npm run serve
```

生产环境构建，产物输出到 `dist/`：

```bash
npm run build
```

代码检查并自动修复：

```bash
npm run lint
```

### 接口代码生成

后端启动并暴露 Swagger 文档后，重新生成 `src/api` 下的接口代码：

```bash
npm run openapi
```

生成配置见 `openapi.config.ts`：

- 数据源：`http://localhost:8101/api/v2/api-docs`
- 请求库：`import request from '@/request'`
- 输出目录：`./src`

注意：该命令会覆盖 `src/api` 目录下的生成文件，手工修改的内容会丢失，业务代码请写在 `src/api` 之外。

## 与后端的约定

- 请求地址在 `src/request.ts` 中通过 `baseURL` 配置，默认 `http://localhost:8101`；项目未配置开发代理，浏览器直接请求后端，后端需允许跨域并携带 Cookie（`withCredentials: true`）。
- 登录态基于 Cookie 会话，登录用户信息由 `src/store/userStore.ts` 统一维护。
- 响应体约定 `code === 0` 为成功，`code === 40100` 表示未登录，此时响应拦截器会提示并跳转登录页。
- 请求超时统一设置为 60 秒（AI 生成等耗时接口依赖此配置）。
- AI 实时生成题目使用 SSE，地址在 `src/views/add/components/AiGenerateQuestionDrawer.vue` 中直接拼接，后端地址变更时需同步修改该处。

## 说明

- `vue.config.js` 中 `lintOnSave: false`，开发时不会因 ESLint 报错中断编译，提交前建议手动执行 `npm run lint`。
- `src/api/typings.d.ts` 由 OpenAPI 工具生成，请勿手工修改。
