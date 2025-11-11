# Collage 页面搭建系统

本仓库采用 **npm workspace** 的方式同时维护页面搭建器（Vue 3 + Vite）与渲染端（Nuxt 3）。搭建器负责可视化拖拽、配置组件并导出 JSON；渲染端读取 JSON 并以支持 SEO 的方式完成页面渲染。

## 项目结构

```
.
├── builder   # Vue 3 拖拽式页面搭建器
└── renderer  # Nuxt 3 渲染运行时，支持 SSR/静态化
```

## 快速开始

在仓库根目录执行以下命令以分别启动两个项目：

```bash
# 安装依赖
npm install

# 启动页面搭建器
npm run dev:builder

# 启动渲染端
npm run dev:renderer
```

> 初次运行时需要在 `builder`、`renderer` 目录下分别安装依赖（`npm install`）。Workspace 模式下直接在仓库根目录执行 `npm install` 即可自动完成。

## 搭建器能力

- 拖拽面板支持容器、文本、图片、按钮四种类型的元素；
- 容器可以嵌套，支持调整布局方向、对齐方式、尺寸、背景色与内外间距；
- 组件投放后自动铺满最近的容器；
- 属性面板支持实时配置文本、图片、按钮的内容；
- 一键导出当前页面的 JSON 描述。

## 渲染端能力

- Nuxt 3 SSR，天然具备 SEO 能力；
- 根据 `public/design.json` 中的页面描述实时渲染；
- 共享与搭建器一致的组件语义与属性，确保所见即所得。

将搭建器导出的 JSON 覆盖 `renderer/public/design.json` 后执行 `npm run build:renderer` 即可生成可部署的静态页面或 SSR 应用。
