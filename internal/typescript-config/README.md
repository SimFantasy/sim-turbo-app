# @sim/typescript-config

这是一个 TypeScript 配置包，提供了多种预设的 tsconfig 配置，适用于不同类型的项目。基于 vben vue admin 的 tsconfig 配置进行优化。

## 📦 安装

在项目的 `package.json` 中添加依赖：

```json
{
  "devDependencies": {
    "@sim/typescript-config": "workspace:*"
  }
}
```

## 🔧 可用配置

### 1. base.json - 基础配置

**用途**：所有其他配置的基础，包含通用的 TypeScript 编译选项

**主要特性**：

- 目标版本：`ESNext`
- 模块系统：`ESNext` + `node` 解析
- 严格模式：启用所有严格检查
- 代码质量：启用未使用变量/参数检查
- 输出控制：`noEmit: true`（不生成文件）
- 排除目录：`node_modules`、`dist`、`.turbo`

**关键配置项**：

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true
  }
}
```

### 2. node.json - Node.js 项目配置

**用途**：适用于 Node.js 后端项目或 CLI 工具

**继承**：`base.json`

**特殊配置**：

- 库支持：仅 `ESNext`
- 类型定义：`node` 类型
- 基础路径：`./`

**使用示例**：

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@sim/typescript-config/node.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. web.json - Web 基础配置

**用途**：适用于 Web 前端项目的基础配置

**继承**：`base.json`

**特殊配置**：

- JSX 支持：`preserve` 模式
- JSX 导入源：`vue`
- 库支持：`ESNext`、`DOM`、`DOM.Iterable`
- 模块解析：`bundler` 模式
- 类型定义：`vite/client`
- 声明文件：`declaration: false`

**使用示例**：

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@sim/typescript-config/web.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. web-app.json - Web 应用配置

**用途**：适用于完整的 Web 应用项目

**继承**：`web.json`

**特殊配置**：

- 专门针对 Vite 客户端类型优化

**使用示例**：

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@sim/typescript-config/web-app.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 5. library.json - 库开发配置

**用途**：适用于开发可复用的库或组件包

**继承**：`base.json`

**特殊配置**：

- JSX 支持：`preserve` 模式
- 库支持：`ESNext`、`DOM`、`DOM.Iterable`
- 模块解析：`bundler` 模式
- 声明文件：`declaration: true`（生成 .d.ts 文件）
- 输出控制：`noEmit: false`（允许生成文件）

**使用示例**：

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@sim/typescript-config/library.json",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## 🎯 配置选择指南

| 项目类型         | 推荐配置       | 说明                   |
| ---------------- | -------------- | ---------------------- |
| Node.js 后端/CLI | `node.json`    | 包含 Node.js 类型定义  |
| Vue/React 组件库 | `library.json` | 生成声明文件，支持 JSX |
| Vue/React 应用   | `web-app.json` | 完整的 Web 应用支持    |
| 通用 Web 项目    | `web.json`     | 基础的 Web 开发支持    |
| 自定义项目       | `base.json`    | 最小化配置，可自由扩展 |

## 🔍 配置继承关系

```
base.json (基础配置)
├── node.json (Node.js 项目)
├── library.json (库开发)
└── web.json (Web 基础)
    └── web-app.json (Web 应用)
```

## 💡 最佳实践

### 1. 项目特定配置

在继承基础配置后，可以根据项目需求添加特定配置：

```json
{
  "extends": "@sim/typescript-config/web-app.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "types"],
  "exclude": ["node_modules", "dist", "public"]
}
```

### 2. 多环境配置

可以为不同环境创建不同的配置文件：

```json
// tsconfig.build.json - 构建配置
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "outDir": "dist"
  },
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]
}
```

### 3. 严格模式建议

所有配置都启用了严格模式，建议保持以下设置：

- `strict: true` - 启用所有严格检查
- `noImplicitAny: true` - 禁止隐式 any 类型
- `noUnusedLocals: true` - 检查未使用的局部变量
- `noUnusedParameters: true` - 检查未使用的参数

## 🚀 快速开始

1. 安装依赖
2. 根据项目类型选择合适的配置
3. 创建 `tsconfig.json` 文件并继承对应配置
4. 根据需要添加项目特定的配置选项

这样就可以快速开始使用 TypeScript 进行开发了！
