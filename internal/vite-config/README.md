# @sim/vite-config

> Vite 公共配置包，提供开箱即用的 Vite 配置方案，支持 Vue 项目和通用项目的构建需求。

## 📦 安装

```bash
# 使用 pnpm
pnpm add @sim/vite-config -D

# 使用 npm
npm install @sim/vite-config --save-dev

# 使用 yarn
yarn add @sim/vite-config -D
```

## 🚀 快速开始

### Vue 项目配置

在你的 `vite.config.ts` 文件中：

```typescript
import { defineConfig } from 'vite'
import { createVueConfig } from '@sim/vite-config'

export default defineConfig(createVueConfig({
  // 你的自定义配置
}))
```

### 基础项目配置

```typescript
import { defineConfig } from 'vite'
import { createBaseConfig } from '@sim/vite-config'

export default defineConfig(createBaseConfig({
  // 你的自定义配置
}))
```

## 📋 可用配置

### 1. 基础配置 (`createBaseConfig`)

提供通用的构建选项，不包含特定框架的插件。

```typescript
import { createBaseConfig } from '@sim/vite-config'

const config = createBaseConfig({
  root: process.cwd(),           // 项目根目录
  alias: {                       // 路径别名
    '@': './src',
    '~': './'
  },
  define: {                      // 全局定义
    __DEV__: true
  },
  target: 'es2015',             // 构建目标
  cssTarget: 'chrome80',        // CSS 目标
  outDir: 'dist'                // 输出目录
})
```

**特性：**
- 🎯 智能分包策略（Vue、UI 库、工具库分离）
- 📦 优化的构建配置
- 🔧 可自定义路径别名和全局定义

### 2. Vue 配置 (`createVueConfig`)

基于基础配置，添加 Vue 特定的插件和配置。

```typescript
import { createVueConfig } from '@sim/vite-config'

const config = createVueConfig({
  // 基础配置选项
  root: './src',
  alias: {
    '@': './src',
    '#': './src/types'
  },
  
  // 插件配置
  plugins: {
    jsx: true,              // JSX 支持
    devTools: true,         // Vue 开发工具
    tailwindcss: true,      // TailwindCSS
    mock: true,             // Mock 数据
    naiveUi: true,          // Naive UI 自动导入
    html: true,             // HTML 插件
    compress: true,         // 压缩插件
    i18n: true              // 国际化支持
  },
  
  // 服务器配置
  server: {
    port: 5173,             // 端口号
    open: true,             // 自动打开浏览器
    proxy: [                // 代理配置
      ['/api', 'http://localhost:3000']
    ]
  },
  
  // 环境变量
  env: {
    VITE_APP_TITLE: 'My App',
    VITE_API_URL: 'http://localhost:3000',
    VITE_USE_MOCK: true,
    VITE_BUILD_COMPRESS: 'gzip',
    VITE_DROP_CONSOLE: true
  },
  
  isBuild: false,           // 是否为构建模式
  buildTime: '2024-01-15 14:30:25'  // 构建时间
})
```

### 3. 开发环境配置 (`createDevConfig`)

预配置的开发环境设置，启用开发友好的插件。

```typescript
import { createDevConfig } from '@sim/vite-config'

const config = createDevConfig({
  server: {
    port: 3000
  },
  env: {
    VITE_USE_MOCK: true
  }
})
```

**默认启用的插件：**
- ✅ JSX 支持
- ✅ Vue 开发工具
- ✅ TailwindCSS
- ✅ Mock 数据
- ✅ Naive UI 自动导入
- ✅ 国际化支持
- ❌ HTML 插件
- ❌ 压缩插件

### 4. 生产环境配置 (`createProdConfig`)

预配置的生产环境设置，启用构建优化插件。

```typescript
import { createProdConfig } from '@sim/vite-config'

const config = createProdConfig({
  env: {
    VITE_BUILD_COMPRESS: 'gzip',
    VITE_DROP_CONSOLE: true
  }
})
```

**默认启用的插件：**
- ✅ JSX 支持
- ✅ TailwindCSS
- ✅ Naive UI 自动导入
- ✅ HTML 插件
- ✅ 压缩插件
- ✅ 国际化支持
- ❌ Vue 开发工具
- ❌ Mock 数据

## 🔧 工具函数

### 环境判断

```typescript
import { isDevMode, isProdMode, isReportMode } from '@sim/vite-config'

if (isDevMode(mode)) {
  // 开发环境逻辑
}

if (isProdMode(mode)) {
  // 生产环境逻辑
}

if (isReportMode()) {
  // 报告模式逻辑
}
```

### 代理配置

```typescript
import { createProxy } from '@sim/vite-config'

const proxy = createProxy([
  ['/api', 'http://localhost:3000'],
  ['/upload', 'https://api.example.com']
])
```

### 压缩配置

```typescript
import { configCompressPlugin } from '@sim/vite-config'

// 配置 gzip 压缩
const gzipPlugin = configCompressPlugin('gzip', false)

// 配置 brotli 压缩
const brotliPlugin = configCompressPlugin('brotli', true)

// 配置多种压缩
const compressPlugins = configCompressPlugin('gzip,brotli', false)
```

### HTML 插件

```typescript
import { setupHtmlPlugin, getBuildTime } from '@sim/vite-config'

const htmlPlugin = setupHtmlPlugin(getBuildTime(), {
  title: 'My App',
  meta: {
    version: '1.0.0',
    author: 'Your Name'
  }
})
```

### 构建时间

```typescript
import { getBuildTime } from '@sim/vite-config'

// 默认时区和格式
const buildTime = getBuildTime()
console.log(buildTime) // '2024-01-15 14:30:25'

// 自定义时区和格式
const customTime = getBuildTime('America/New_York', 'MM/DD/YYYY hh:mm A')
console.log(customTime) // '01/15/2024 02:30 AM'
```

## 📝 环境变量配置

### ViteEnv 接口

```typescript
interface ViteEnv {
  VITE_APP_TITLE: string                    // 应用标题
  VITE_API_URL: string                      // API 地址
  VITE_BASE_PATH: string                    // 基础路径
  VITE_PORT: number                         // 端口号
  VITE_PROXY: [string, string][]            // 代理配置
  VITE_USE_MOCK: boolean                    // 是否使用 Mock
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'  // 构建压缩类型
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean  // 是否删除原文件
  VITE_DROP_CONSOLE: boolean                // 是否移除 console
  VITE_ROUTE_LOAD_MODE: 'dynamic' | 'static'       // 路由加载模式
}
```

### .env 文件示例

```bash
# .env.development
VITE_APP_TITLE=开发环境
VITE_API_URL=http://localhost:3000
VITE_BASE_PATH=/
VITE_PORT=5173
VITE_PROXY=[['/api','http://localhost:3000']]
VITE_USE_MOCK=true
VITE_BUILD_COMPRESS=none
VITE_DROP_CONSOLE=false
VITE_ROUTE_LOAD_MODE=dynamic

# .env.production
VITE_APP_TITLE=生产环境
VITE_API_URL=https://api.example.com
VITE_BASE_PATH=/app/
VITE_PORT=80
VITE_PROXY=[]
VITE_USE_MOCK=false
VITE_BUILD_COMPRESS=gzip
VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE=false
VITE_DROP_CONSOLE=true
VITE_ROUTE_LOAD_MODE=static
```

## 🎯 使用场景

### 1. 标准 Vue 3 项目

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { createVueConfig } from '@sim/vite-config'

export default defineConfig(createVueConfig({
  plugins: {
    jsx: true,
    devTools: true,
    tailwindcss: true,
    naiveUi: true
  }
}))
```

### 2. 企业级项目（带 Mock 和压缩）

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import { createVueConfig, wrapperEnv } from '@sim/vite-config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  
  return createVueConfig({
    env: viteEnv,
    plugins: {
      mock: viteEnv.VITE_USE_MOCK,
      compress: viteEnv.VITE_BUILD_COMPRESS !== 'none',
      html: true
    },
    server: {
      port: viteEnv.VITE_PORT,
      proxy: viteEnv.VITE_PROXY
    }
  })
})
```

### 3. 多环境配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { createDevConfig, createProdConfig } from '@sim/vite-config'

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    // 开发环境
    return createDevConfig({
      server: {
        port: 3000,
        proxy: [
          ['/api', 'http://localhost:8080']
        ]
      }
    })
  } else {
    // 生产环境
    return createProdConfig({
      env: {
        VITE_BUILD_COMPRESS: 'gzip',
        VITE_DROP_CONSOLE: true
      }
    })
  }
})
```

### 4. 自定义插件配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { createVueConfig, createVitePlugins } from '@sim/vite-config'
import customPlugin from './plugins/custom-plugin'

export default defineConfig(() => {
  const baseConfig = createVueConfig({
    plugins: {
      jsx: true,
      tailwindcss: true
    }
  })
  
  // 添加自定义插件
  baseConfig.plugins = [
    ...createVitePlugins({
      plugins: {
        jsx: true,
        tailwindcss: true
      }
    }),
    customPlugin()
  ]
  
  return baseConfig
})
```

## 🔌 内置插件

### Vue 相关
- **@vitejs/plugin-vue**: Vue 3 单文件组件支持
- **@vitejs/plugin-vue-jsx**: Vue JSX 支持
- **vite-plugin-vue-devtools**: Vue 开发工具
- **vite-plugin-vue-setup-extend**: setup 语法扩展

### 自动导入
- **unplugin-auto-import**: API 自动导入
- **unplugin-vue-components**: 组件自动导入
- **unplugin-icons**: 图标自动导入

### 样式和 UI
- **@tailwindcss/vite**: TailwindCSS 支持
- **naive-ui**: Naive UI 组件库自动导入

### 开发工具
- **vite-plugin-mock**: Mock 数据支持
- **vite-plugin-progress**: 构建进度显示
- **vite-svg-loader**: SVG 文件加载

### 构建优化
- **vite-plugin-compression**: 文件压缩（gzip/brotli）
- **vite-plugin-image-optimizer**: 图片优化

## 📊 配置优先级

配置的合并优先级（从高到低）：

1. **用户传入的配置** - 最高优先级
2. **环境特定配置** - createDevConfig/createProdConfig 的默认值
3. **Vue 配置默认值** - createVueConfig 的默认值
4. **基础配置默认值** - createBaseConfig 的默认值

## 🛠️ 最佳实践

### 1. 项目初始化

```bash
# 1. 安装依赖
pnpm add @sim/vite-config -D

# 2. 创建配置文件
echo 'import { defineConfig } from "vite"
import { createVueConfig } from "@sim/vite-config"

export default defineConfig(createVueConfig())' > vite.config.ts

# 3. 创建环境变量文件
echo 'VITE_APP_TITLE=My App
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=true' > .env.development
```

### 2. TypeScript 支持

在 `vite-env.d.ts` 中添加类型声明：

```typescript
/// <reference types="vite/client" />
/// <reference types="@sim/vite-config/types" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_USE_MOCK: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 3. 性能优化

```typescript
// 针对大型项目的优化配置
export default defineConfig(createVueConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型库单独打包
          'vendor-ui': ['naive-ui', '@naive-ui/themes'],
          'vendor-utils': ['dayjs', '@vueuse/core', 'es-toolkit'],
          'vendor-icons': ['@iconify/vue']
        }
      }
    }
  },
  plugins: {
    // 生产环境启用压缩
    compress: true
  }
}))
```

### 4. 调试配置

```typescript
// 开启详细的构建信息
export default defineConfig(createVueConfig({
  build: {
    sourcemap: true,
    reportCompressedSize: true
  },
  plugins: {
    devTools: true
  }
}))
```

## ❓ 常见问题

### Q: 如何禁用某个插件？

A: 在插件配置中设置为 `false`：

```typescript
export default defineConfig(createVueConfig({
  plugins: {
    mock: false,        // 禁用 Mock
    devTools: false,    // 禁用开发工具
    compress: false     // 禁用压缩
  }
}))
```

### Q: 如何添加自定义代理？

A: 使用 `createProxy` 函数或直接配置：

```typescript
import { createProxy } from '@sim/vite-config'

export default defineConfig(createVueConfig({
  server: {
    proxy: createProxy([
      ['/api', 'http://localhost:8080'],
      ['/upload', 'https://cdn.example.com']
    ])
  }
}))
```

### Q: 如何自定义构建输出？

A: 通过基础配置选项：

```typescript
export default defineConfig(createVueConfig({
  outDir: 'build',           // 自定义输出目录
  target: 'es2020',          // 自定义构建目标
  cssTarget: 'chrome90'      // 自定义 CSS 目标
}))
```

### Q: 如何处理环境变量？

A: 使用 `wrapperEnv` 函数：

```typescript
import { loadEnv } from 'vite'
import { wrapperEnv } from '@sim/vite-config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  
  return createVueConfig({
    env: viteEnv
  })
})
```

## 📄 更新日志

### v0.0.1
- 🎉 初始版本发布
- ✨ 支持基础和 Vue 项目配置
- 🔧 内置常用插件和工具函数
- 📚 完整的 TypeScript 类型支持
- 🌍 支持多环境配置
- 🚀 开箱即用的开发和生产环境配置

## 📞 技术支持

如果你在使用过程中遇到问题，可以：

1. 查看本文档的常见问题部分
2. 检查 Vite 官方文档
3. 提交 Issue 到项目仓库

---

**Happy Coding! 🎉**