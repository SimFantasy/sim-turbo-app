# @sim/tsup-config

tsup 公共构建配置包，提供统一的 tsup 构建配置，供小型 TypeScript 模块使用。

## 特性

- 🚀 基于 tsup 8.5.0 最新版本
- 🎯 提供多种预设配置（library、cli、node、dev、prod）
- 🔧 支持灵活的配置选项
- 📦 开箱即用的默认配置
- 📝 完整的 TypeScript 类型支持
- 🛠️ 适用于不同类型的项目

## 安装

```bash
pnpm add -D @sim/tsup-config
```

## 使用方法

### 1. 基础使用

```typescript
// tsup.config.ts
import { createTsupConfig } from '@sim/tsup-config'

export default createTsupConfig()
```

### 2. 自定义配置

```typescript
// tsup.config.ts
import { createTsupConfig } from '@sim/tsup-config'

export default createTsupConfig({
	entry: ['src/index.ts', 'src/cli.ts'],
	format: ['esm'],
	external: ['react', 'vue'],
	minify: true
})
```

### 3. 使用预设配置

```typescript
// 库项目配置
import { createLibraryConfig } from '@sim/tsup-config'

export default createLibraryConfig({
	entry: ['src/index.ts'],
	external: ['react', 'vue']
})

// CLI 工具配置
import { createCliConfig } from '@sim/tsup-config'

export default createCliConfig({
	entry: ['src/cli.ts']
})

// Node.js 服务配置
import { createNodeConfig } from '@sim/tsup-config'

export default createNodeConfig({
	entry: ['src/server.ts'],
	external: ['express', 'mongoose']
})
```

## 配置选项

### TsupConfigOptions

```typescript
interface TsupConfigOptions {
	/** 入口文件 @default ['src/index.ts'] */
	entry?: string[] | Record<string, string>

	/** 输出格式 @default ['cjs', 'esm'] */
	format?: ('cjs' | 'esm' | 'iife')[]

	/** 是否生成类型声明文件 @default true */
	dts?: boolean

	/** 是否清理输出目录 @default true */
	clean?: boolean

	/** 外部依赖 @default [] */
	external?: string[]

	/** 是否启用代码分割 @default false */
	splitting?: boolean

	/** 是否生成 sourcemap @default true */
	sourcemap?: boolean

	/** 是否压缩代码 @default false */
	minify?: boolean

	/** 目标环境 @default 'node18' */
	target?: string

	/** 输出目录 @default 'dist' */
	outDir?: string

	/** 是否监听文件变化 @default false */
	watch?: boolean

	/** 额外的 tsup 选项 */
	additionalOptions?: Partial<Options>
}
```

## 预设配置

### 1. 库项目配置 (createLibraryConfig)

适用于需要发布到 npm 的库项目：

```typescript
{
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false
}
```

**使用场景**：

- npm 包开发
- 工具库
- 组件库

### 2. CLI 工具配置 (createCliConfig)

适用于命令行工具项目：

```typescript
{
  format: ['esm'],
  dts: false,
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: true,
  target: 'node18'
}
```

**使用场景**：

- 命令行工具
- 脚手架工具
- 构建工具

### 3. Node.js 服务配置 (createNodeConfig)

适用于 Node.js 后端服务项目：

```typescript
{
  format: ['cjs'],
  dts: false,
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  target: 'node18'
}
```

**使用场景**：

- Express 服务
- Koa 应用
- 微服务

### 4. 开发模式配置 (createDevConfig)

启用监听模式，适用于开发环境：

```typescript
{
  watch: true,
  clean: false,
  minify: false,
  sourcemap: true
}
```

### 5. 生产模式配置 (createProdConfig)

启用压缩，适用于生产环境：

```typescript
{
  clean: true,
  minify: true,
  sourcemap: false
}
```

## 使用示例

### 库项目示例

```typescript
// tsup.config.ts
import { createLibraryConfig } from '@sim/tsup-config'

export default createLibraryConfig({
	entry: {
		index: 'src/index.ts',
		utils: 'src/utils.ts'
	},
	external: ['react', 'vue', 'lodash'],
	additionalOptions: {
		banner: {
			js: '/* My Library v1.0.0 */'
		}
	}
})
```

### CLI 工具示例

```typescript
// tsup.config.ts
import { createCliConfig } from '@sim/tsup-config'

export default createCliConfig({
	entry: ['src/cli.ts'],
	external: ['inquirer', 'commander', 'chalk'],
	additionalOptions: {
		shims: true // 添加 Node.js shims
	}
})
```

### 多入口配置示例

```typescript
// tsup.config.ts
import { createTsupConfig } from '@sim/tsup-config'

export default createTsupConfig({
	entry: {
		index: 'src/index.ts',
		client: 'src/client.ts',
		server: 'src/server.ts'
	},
	format: ['esm'],
	external: ['react', 'express'],
	splitting: true
})
```

### 环境相关配置

```typescript
// tsup.config.ts
import { createDevConfig, createProdConfig } from '@sim/tsup-config'

const isDev = process.env.NODE_ENV === 'development'

export default isDev
	? createDevConfig({
			entry: ['src/index.ts']
	  })
	: createProdConfig({
			entry: ['src/index.ts'],
			external: ['react', 'vue']
	  })
```

## 最佳实践

### 1. 项目结构

```
project/
├── src/
│   ├── index.ts
│   ├── utils.ts
│   └── types.ts
├── dist/           # 构建输出
├── tsup.config.ts  # tsup 配置
├── package.json
└── tsconfig.json
```

### 2. package.json 配置

```json
{
	"name": "my-package",
	"type": "module",
	"main": "./dist/index.js",
	"module": "./dist/index.js",
	"types": "./dist/index.d.ts",
	"exports": {
		".": {
			"import": "./dist/index.js",
			"types": "./dist/index.d.ts"
		}
	},
	"files": ["dist"],
	"scripts": {
		"build": "tsup",
		"dev": "tsup --watch",
		"type-check": "tsc --noEmit"
	}
}
```

### 3. 外部依赖管理

```typescript
// 自动排除所有 dependencies
import { createLibraryConfig } from '@sim/tsup-config'
import pkg from './package.json'

export default createLibraryConfig({
	external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
})
```

### 4. 条件构建

```typescript
// tsup.config.ts
import { createTsupConfig } from '@sim/tsup-config'

const isProduction = process.env.NODE_ENV === 'production'

export default createTsupConfig({
	entry: ['src/index.ts'],
	minify: isProduction,
	sourcemap: !isProduction,
	clean: isProduction
})
```

## 与其他工具集成

### 与 Vite 集成

```typescript
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			formats: ['es', 'cjs']
		}
	}
})

// tsup.config.ts (用于类型生成)
import { createTsupConfig } from '@sim/tsup-config'

export default createTsupConfig({
	entry: ['src/index.ts'],
	format: [], // 不生成 JS，只生成类型
	dts: { only: true }
})
```

### 与 Rollup 集成

```typescript
// 使用 tsup 进行快速开发构建
// 使用 Rollup 进行生产构建
export default process.env.NODE_ENV === 'development' ? createDevConfig() : undefined // 使用 Rollup 配置
```

## 故障排除

### 常见问题

1. **类型声明文件生成失败**

   - 确保 `tsconfig.json` 配置正确
   - 检查 `dts: true` 选项是否启用

2. **外部依赖打包问题**

   - 使用 `external` 选项排除不需要打包的依赖
   - 检查 `package.json` 中的依赖配置

3. **构建速度慢**

   - 启用 `splitting: false` 禁用代码分割
   - 使用 `sourcemap: false` 禁用源码映射

4. **Node.js 兼容性问题**
   - 调整 `target` 选项到合适的 Node.js 版本
   - 使用 `format: ['cjs']` 确保 CommonJS 兼容性
