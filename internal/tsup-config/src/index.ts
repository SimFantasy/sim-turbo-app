/**
 * tsup 公共构建配置
 * 提供统一的 tsup 构建配置，供小型 TS 模块使用
 *
 * @example
 * ```typescript
 * // tsup.config.ts
 * import { createTsupConfig } from '@repo/tsup-config'
 *
 * export default createTsupConfig()
 * ```
 *
 * @example
 * ```typescript
 * // 自定义配置
 * import { createTsupConfig } from '@repo/tsup-config'
 *
 * export default createTsupConfig({
 *   entry: ['src/index.ts', 'src/cli.ts'],
 *   format: ['esm'],
 *   external: ['react', 'vue']
 * })
 * ```
 */

import type { Options } from 'tsup'

/**
 * tsup 配置选项接口
 */
export interface TsupConfigOptions {
  /**
   * 额外的 tsup 选项
   */
  additionalOptions?: Partial<Options>

  /**
   * 是否清理输出目录
   * @default true
   */
  clean?: boolean

  /**
   * 是否生成类型声明文件
   * @default true
   */
  dts?: boolean

  /**
   * 入口文件
   * @default ['src/index.ts']
   */
  entry?: Record<string, string> | string[]

  /**
   * 外部依赖
   * @default []
   */
  external?: string[]

  /**
   * 输出格式
   * @default ['cjs', 'esm']
   */
  format?: ('cjs' | 'esm' | 'iife')[]

  /**
   * 是否压缩代码
   * @default false
   */
  minify?: boolean

  /**
   * 输出目录
   * @default 'dist'
   */
  outDir?: string

  /**
   * 是否生成 sourcemap
   * @default true
   */
  sourcemap?: boolean

  /**
   * 是否启用代码分割
   * @default false
   */
  splitting?: boolean

  /**
   * 目标环境
   * @default 'node18'
   */
  target?: string

  /**
   * 是否监听文件变化
   * @default false
   */
  watch?: boolean
}

/**
 * 默认的 tsup 配置
 */
export const defaultTsupConfig: Required<Omit<TsupConfigOptions, 'additionalOptions'>> = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: [],
  splitting: false,
  sourcemap: true,
  minify: false,
  target: 'node18',
  outDir: 'dist',
  watch: false
}

/**
 * 创建 tsup 配置
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * // 基础使用
 * export default createTsupConfig()
 *
 * // 自定义配置
 * export default createTsupConfig({
 *   entry: ['src/index.ts', 'src/cli.ts'],
 *   format: ['esm'],
 *   external: ['react', 'vue'],
 *   minify: true
 * })
 * ```
 */
export function createTsupConfig(options: TsupConfigOptions = {}): Options {
  const {
    entry = defaultTsupConfig.entry,
    format = defaultTsupConfig.format,
    dts = defaultTsupConfig.dts,
    clean = defaultTsupConfig.clean,
    external = defaultTsupConfig.external,
    splitting = defaultTsupConfig.splitting,
    sourcemap = defaultTsupConfig.sourcemap,
    minify = defaultTsupConfig.minify,
    target = defaultTsupConfig.target,
    outDir = defaultTsupConfig.outDir,
    watch = defaultTsupConfig.watch,
    additionalOptions = {}
  } = options

  const config: Options = {
    entry,
    format,
    dts,
    clean,
    external,
    splitting,
    sourcemap,
    minify,
    target,
    outDir,
    watch,
    ...additionalOptions
  }

  return config
}

/**
 * 创建库项目的 tsup 配置
 * 适用于需要发布到 npm 的库项目
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * export default createLibraryConfig({
 *   entry: ['src/index.ts'],
 *   external: ['react', 'vue']
 * })
 * ```
 */
export function createLibraryConfig(options: TsupConfigOptions = {}): Options {
  return createTsupConfig({
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    ...options
  })
}

/**
 * 创建 CLI 工具的 tsup 配置
 * 适用于命令行工具项目
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * export default createCliConfig({
 *   entry: ['src/cli.ts'],
 *   external: ['inquirer', 'commander']
 * })
 * ```
 */
export function createCliConfig(options: TsupConfigOptions = {}): Options {
  return createTsupConfig({
    format: ['esm'],
    dts: false,
    clean: true,
    splitting: false,
    sourcemap: false,
    minify: true,
    target: 'node18',
    ...options
  })
}

/**
 * 创建 Node.js 服务的 tsup 配置
 * 适用于 Node.js 后端服务项目
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * export default createNodeConfig({
 *   entry: ['src/server.ts'],
 *   external: ['express', 'mongoose']
 * })
 * ```
 */
export function createNodeConfig(options: TsupConfigOptions = {}): Options {
  return createTsupConfig({
    format: ['cjs'],
    dts: false,
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'node18',
    ...options
  })
}

/**
 * 创建开发模式的 tsup 配置
 * 启用监听模式，适用于开发环境
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * export default createDevConfig({
 *   entry: ['src/index.ts']
 * })
 * ```
 */
export function createDevConfig(options: TsupConfigOptions = {}): Options {
  return createTsupConfig({
    watch: true,
    clean: false,
    minify: false,
    sourcemap: true,
    ...options
  })
}

/**
 * 创建生产模式的 tsup 配置
 * 启用压缩，适用于生产环境
 *
 * @param options 配置选项
 * @returns tsup 配置对象
 *
 * @example
 * ```typescript
 * export default createProdConfig({
 *   entry: ['src/index.ts']
 * })
 * ```
 */
export function createProdConfig(options: TsupConfigOptions = {}): Options {
  return createTsupConfig({
    clean: true,
    minify: true,
    sourcemap: false,
    ...options
  })
}

/**
 * 导出默认配置
 */
export default createTsupConfig

// TsupConfigOptions 接口已在上面导出
