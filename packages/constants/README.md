# @sim/constants

公共常量包，提供项目中使用的各种配置常量和环境变量管理。

## 安装

```bash
pnpm add @sim/constants
```

## 使用方式

### 基本导入

```typescript
// 导入所有配置
import {
	APP_CONFIG,
	SERVER_CONFIG,
	DEFAULT_CONFIG,
	PAGINATION_CONFIG,
	STORAGE_KEYS,
	STORAGE_CONFIG,
	NAIVE_THEME,
	THEME_MODES,
	LAYOUT_CONFIG
} from '@sim/constants'

// 或按需导入
import { APP_CONFIG, SERVER_CONFIG } from '@sim/constants'
```

## 类型支持

所有配置都使用 `as const` 断言，提供完整的 TypeScript 类型支持：

```typescript
// 类型推断
type AppName = typeof APP_CONFIG.NAME // string
type ThemeMode = typeof THEME_MODES.LIGHT // "light"
type StorageKey = typeof STORAGE_KEYS.TOKEN // "token"
```

## 注意事项

1. **环境变量兼容性**：本包的环境变量获取工具兼容 Vite（ESM）和 Node.js（CommonJS）环境
2. **构建输出**：包同时提供 ESM 和 CommonJS 格式的构建产物
3. **类型安全**：所有配置都有完整的 TypeScript 类型定义
4. **不可变性**：使用 `as const` 确保配置的不可变性
