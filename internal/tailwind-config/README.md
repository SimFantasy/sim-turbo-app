# @sim/tailwind-config

TailwindCSS 4 公共配置包，提供统一的样式配置和设计系统，基于 sim-admin 的样式进行优化。

## 特性

- 🎨 基于 TailwindCSS 4.1.11 最新语法
- 📦 基于 Turborepo with-tailwind 示例的 PostCSS 配置
- 🌙 内置暗色模式支持
- 🎯 完整的设计系统（颜色、间距、圆角）
- 🚀 丰富的工具类和组件样式
- 📱 响应式设计支持
- ✨ Vue 过渡动画样式 + tw-animate-css 动画库
- 🔧 TypeScript 配置支持

## 使用

## 使用方法

### 项目中使用

#### 1. 配置 postcss.config.ts

```typescript
import { postcssConfig } from '@sim/tailwind-config/postcss'

export default postcssConfig
```

#### 2. 在 package.json 中添加 tailwindcss 依赖

```json
{
	"devDependencies": {
		"@sim/tailwind-config": "catalog:",
		"@tailwindcss/postcss": "catalog:",
		"@tailwindcss/vite": "catalog:",
		"tailwindcss": "catalog:"
	}
}
```

#### 3. 在 vite.config.ts 中配置

```typescript
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [tailwindcss()]
})
```

#### 4. 在 css 文件中导入 tailwindcss 样式

```css
@import 'tailwindcss';
@import '@sim/tailwind-config';
```

#### 5. 在 Vue 组件中使用

在 Vue 组件的 `<style>` 标签中使用 `@reference` 指令引用配置：

```vue
<template>
	<div class="flex-center bg-primary text-primary-foreground p-4 rounded-lg">
		<h1 class="text-2xl font-bold">Hello World</h1>
	</div>
</template>

<style>
@reference "@sim/tailwind-config";

.custom-component {
	@apply flex-center trans-all hover:scale-105;
}
</style>
```

### 在组件库中使用

#### 1. 配置 pcakage.json

````bash
注意需要使用tailwindcsslai 编译样式

```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "sideEffects": [
    "**/*.css"
  ],
  "files": [
    "dist"
  ],
  "exports": {
    "./styles.css": "./dist/index.css",
    "./*": "./dist/*.js"
  },
  "license": "MIT",
  "scripts": {
    "build:styles": "tailwindcss -i ./src/styles.css -o ./dist/index.css",
    "build:components": "tsc",
    "dev:styles": "tailwindcss -i ./src/styles.css -o ./dist/index.css --watch",
    "dev:components": "tsc --watch",
    "check-types": "tsc --noEmit",
    "lint": "eslint src --max-warnings 0"
  },
  "devDependencies": {
    "@repo/tailwind-config": "workspace:*",
    "@tailwindcss/cli": "catalog:",
    "eslint": "catalog:",
    "tailwindcss": "catalog:",
    "eslint": "catalog:",
    "typescript": "catalog:"
  }
}
````

#### 2. 配置 turbo.json

```json
{
	"extends": ["//"],
	"tasks": {
		"build": {
			"dependsOn": ["build:styles", "build:components"]
		},
		"build:styles": {
			"outputs": ["dist/**"]
		},
		"build:components": {
			"outputs": ["dist/**"]
		},
		"dev": {
			"with": ["dev:styles", "dev:components"]
		},
		"dev:styles": {
			"cache": false,
			"persistent": true
		},
		"dev:components": {
			"cache": false,
			"persistent": true
		}
	}
}
```

#### 3. 在 css 文件中导入 tailwindcss 样式

```css
@import 'tailwindcss';
@import '@sim/tailwind-config';
```
