# @sim/eslint-config

ESLint 公共配置包，基于 [vben vue admin](https://github.com/vbenjs/vue-vben-admin) 提供统一的代码规范。支持 JavaScript、TypeScript、Vue、Node.js 等多种环境的代码检查。

## 📦 安装

在项目的 `package.json` 中添加依赖：

```json
{
  "devDependencies": {
    "@sim/eslint-config": "workspace:*",
    "eslint": "^9.0.0"
  }
}
```

## 🚀 基本使用

在项目根目录创建 `eslint.config.mjs` 文件：

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig()
```

### 自定义配置

你可以传入额外的配置来覆盖或扩展默认规则：

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig([
  {
    // 自定义规则
    rules: {
      'no-console': 'warn',
      'vue/multi-word-component-names': 'error'
    }
  },
  {
    // 针对特定文件的配置
    files: ['src/utils/**/*.ts'],
    rules: {
      'no-console': 'off'
    }
  }
])
```

## 🔧 包含的配置模块

### 1. JavaScript 基础配置 (`javascript`)

**功能**：提供 JavaScript 的基础代码规范

**主要特性**：
- 基于 `@eslint/js` 推荐配置
- 支持 ES2021+ 语法
- 启用严格的代码质量检查
- 自动移除未使用的导入
- 强制使用现代 JavaScript 特性

**关键规则**：
- `no-console`: 仅允许 `warn` 和 `error`
- `prefer-const`: 强制使用 const
- `no-var`: 禁用 var
- `prefer-template`: 优先使用模板字符串
- `unused-imports/no-unused-imports`: 自动移除未使用导入

### 2. TypeScript 配置 (`typescript`)

**功能**：为 TypeScript 项目提供类型安全和代码质量检查

**适用文件**：`**/*.?([cm])[jt]s?(x)`

**主要特性**：
- 基于 `@typescript-eslint` 严格配置
- 支持 JSX 语法
- 项目级别的类型检查
- 智能的类型推断规则

**关键规则**：
- `@typescript-eslint/no-explicit-any`: 关闭（允许使用 any）
- `@typescript-eslint/no-non-null-assertion`: 禁止非空断言
- `@typescript-eslint/ban-ts-comment`: 允许带描述的 TS 注释
- `@typescript-eslint/no-unused-vars`: 检查未使用变量

### 3. Vue 配置 (`vue`)

**功能**：为 Vue.js 项目提供组件和模板的代码规范

**适用文件**：`**/*.vue`

**主要特性**：
- 基于 Vue 官方推荐配置
- 支持 Vue 3 Composition API
- 组件命名和结构规范
- 模板语法检查

**关键规则**：
- `vue/component-name-in-template-casing`: PascalCase 组件命名
- `vue/block-order`: 强制 script、template、style 顺序
- `vue/define-macros-order`: 宏定义顺序规范
- `vue/html-self-closing`: HTML 自闭合标签规范
- `vue/multi-word-component-names`: 关闭（允许单词组件名）

### 4. Node.js 配置 (`node`)

**功能**：为 Node.js 环境提供服务端代码规范

**主要特性**：
- Node.js 环境变量和 API 支持
- CommonJS 和 ES Module 兼容
- 服务端最佳实践规则

### 5. 导入规则配置 (`import`)

**功能**：管理模块导入的规范和顺序

**主要特性**：
- 导入语句排序
- 重复导入检查
- 路径解析规则
- 导入来源验证

### 6. 代码格式化配置 (`prettier`)

**功能**：集成 Prettier 进行代码格式化

**主要特性**：
- 与 Prettier 规则同步
- 自动格式化代码
- 统一的代码风格

### 7. 代码排序配置 (`perfectionist`)

**功能**：自动排序对象属性、导入语句等

**主要特性**：
- 对象属性排序
- 接口属性排序
- 导入语句排序
- 数组元素排序

### 8. 注释规范配置 (`comments`, `jsdoc`)

**功能**：规范代码注释和 JSDoc 文档

**主要特性**：
- JSDoc 格式验证
- 注释内容规范
- 文档完整性检查

### 9. 正则表达式配置 (`regexp`)

**功能**：正则表达式的最佳实践和安全检查

**主要特性**：
- 正则表达式优化建议
- 安全性检查
- 性能优化提示

### 10. 测试配置 (`test`)

**功能**：为测试文件提供专门的规则配置

**主要特性**：
- Vitest 测试框架支持
- 测试文件特殊规则
- 断言和模拟规范

### 11. Unicode 规范配置 (`unicorn`)

**功能**：现代 JavaScript 最佳实践

**主要特性**：
- 现代 API 使用建议
- 代码质量提升
- 性能优化建议

### 12. JSON 配置 (`jsonc`)

**功能**：JSON 和 JSONC 文件的格式检查

**主要特性**：
- JSON 语法验证
- 格式规范检查
- 注释支持（JSONC）

### 13. Turbo 配置 (`turbo`)

**功能**：Turborepo 项目的特殊规则

**主要特性**：
- Monorepo 项目规范
- 包依赖管理
- 构建优化规则

### 14. 命令配置 (`command`)

**功能**：支持通过注释执行 ESLint 命令

**主要特性**：
- 内联命令执行
- 动态规则控制
- 条件性规则应用

### 15. 忽略配置 (`ignores`)

**功能**：定义需要忽略检查的文件和目录

**忽略的文件类型**：
- 依赖目录：`node_modules`、`.turbo`、`.cache`
- 构建产物：`dist`、`output`、`coverage`
- 配置文件：`*.min.*`、`*.snap`、锁文件
- 临时文件：`temp`、`.tmp`、`.history`
- 框架文件：`.next`、`.nuxt`、`.vercel`

### 16. 禁用规则配置 (`disableds`)

**功能**：在特定情况下禁用某些规则

**主要特性**：
- 条件性规则禁用
- 文件类型特定规则
- 环境相关配置

## 🎯 自定义配置说明

### 项目特定规则

配置包含针对不同项目结构的特殊规则：

#### 1. 应用项目规则 (`apps/**/**`)

- 禁止导入特定的内部包（如 `#/api/*`、`#/layouts/*` 等）
- 关闭对象和接口排序规则
- 强制使用正确的包导入路径

#### 2. 包项目规则 (`packages/**/**`)

- 禁止导入 `@sim/*` 包，强制使用 `@core` 包
- 确保包的独立性和可复用性

#### 3. Vue 文件规则 (`**/*.vue`)

- 关闭对象排序规则（保持 Vue 组件的可读性）
- 特殊的组件结构规范

#### 4. 内部工具规则 (`internal/**/**`)

- 允许使用 `console` 输出
- 适用于构建脚本和开发工具

## 📋 使用场景

### 1. Vue 3 + TypeScript 项目

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig([
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/require-default-prop': 'error',
      'vue/require-explicit-emits': 'error'
    }
  }
])
```

### 2. Node.js 后端项目

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig([
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-console': 'off', // 后端允许 console
      '@typescript-eslint/explicit-function-return-type': 'warn'
    }
  }
])
```

### 3. Monorepo 项目

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig([
  {
    files: ['packages/*/src/**/*.ts'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: ['../**/internal/*']
      }]
    }
  }
])
```

## 🔍 规则配置优先级

配置的应用顺序（后面的会覆盖前面的）：

1. `vue()` - Vue 基础规则
2. `javascript()` - JavaScript 基础规则
3. `ignores()` - 忽略文件配置
4. `prettier()` - Prettier 格式化
5. `typescript()` - TypeScript 规则
6. `jsonc()` - JSON 配置
7. `disableds()` - 禁用规则
8. `importPluginConfig()` - 导入规则
9. `node()` - Node.js 规则
10. `perfectionist()` - 代码排序
11. `comments()` - 注释规则
12. `jsdoc()` - JSDoc 规则
13. `unicorn()` - 现代 JS 规则
14. `test()` - 测试规则
15. `regexp()` - 正则规则
16. `command()` - 命令规则
17. `turbo()` - Turbo 规则
18. `customConfig` - 自定义配置
19. 用户传入的配置

## 💡 最佳实践

### 1. 项目初始化

```bash
# 安装依赖
pnpm add -D @sim/eslint-config eslint

# 创建配置文件
echo "import { defineConfig } from '@sim/eslint-config'\nexport default defineConfig()" > eslint.config.mjs

# 添加脚本到 package.json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### 2. IDE 集成

**VS Code 配置** (`.vscode/settings.json`)：

```json
{
  "eslint.experimental.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.formatOnSave": true
}
```

### 3. Git Hooks 集成

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix"]
  }
}
```

### 4. CI/CD 集成

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm lint
```

## 🚨 常见问题

### 1. 与 Prettier 冲突

配置已经集成了 Prettier，如果遇到冲突，请检查：
- 确保使用了正确的 Prettier 配置
- 检查 IDE 的格式化设置
- 确认 `prettier/prettier` 规则已启用

### 2. TypeScript 路径解析问题

确保项目根目录有正确的 `tsconfig.json` 文件：

```json
{
  "extends": "@sim/typescript-config/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3. Vue 组件检查问题

确保安装了必要的依赖：

```bash
pnpm add -D vue-eslint-parser @typescript-eslint/parser
```

### 4. 性能优化

对于大型项目，可以通过以下方式优化性能：

```js
// eslint.config.mjs
import { defineConfig } from '@sim/eslint-config'

export default defineConfig([
  {
    // 只检查源代码目录
    files: ['src/**/*'],
    // 忽略大型文件
    ignores: ['**/*.min.js', '**/vendor/**']
  }
])
```

## 🔄 更新日志

- **v1.0.0**: 初始版本，支持 JavaScript、TypeScript、Vue、Node.js 等环境
- 基于 ESLint 9.0+ 的 Flat Config 格式
- 集成 Prettier、Perfectionist 等插件
- 提供 Monorepo 项目的特殊规则配置

## 📄 许可证

基于 vben vue admin 的 ESLint 配置进行优化和扩展。
