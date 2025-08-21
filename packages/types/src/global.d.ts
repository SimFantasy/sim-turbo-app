/**
 * 全局类型定义
 * 包含应用配置、用户信息、通用接口等全局类型
 */

import type {
  ComponentPublicInstance,
  ComponentRenderProxy,
  FunctionalComponent,
  VNode,
  VNodeChild,
  PropType as VuePropType
} from 'vue'

/**
 * 配置接口
 * 定义@sim/constants中定义的应用配置信息
 */

// 应用配置接口
export interface AppConfig {
  /** 应用名称 */
  NAME: string
  /** 应用版本 */
  VERSION: string
}

// 服务配置接口
export interface ServerConfig {
  API_URL: string
  TIMEOUT: number
  ENABLE_LOADING: boolean
  CANCEL_DUPLICATE_REQUEST: boolean
  ENABLE_RETRY: boolean
  MAX_RETRY_COUNT: number
  RETRY_DELAY: number
}

// 默认配置接口
export interface DefaultConfig {
  LANGUAGE: LanguageType
  THEME: string
  WATERMARK: string
  HOME_PATH: string
}

// 分页配置接口
export interface PaginationConfig {
  /* 当前页码 */
  DEFAULT_PAGE: number
  /* 每页显示条数 */
  PAGE_SIZE: number
}

/**
 * 后台管理类型
 */
// 语言类型
export type LanguageType = 'enUS' | 'zhCN'

// 权限类型
export type RoleType = 'admin' | 'user'

// 用户类型
export type UserType = 'broker' | 'buyer' | 'seller'

// Naive UI 主题颜色
export type ThemeColorType = 'default' | 'error' | 'info' | 'primary' | 'success' | 'warning'

// 暗黑模式类型
export type ColorModeType = 'auto' | 'dark' | 'light'

// 过渡动画类型
export type TransitionAnimationType =
  | 'fade'
  | 'fade-bottom'
  | 'fade-scale'
  | 'fade-slide'
  | 'zoom-fade'
  | 'zoom-out'

/**
 * 环境变量类型定义
 * 用于 Vite 项目的环境变量配置
 */
export interface ViteEnv {
  /** 应用标题 */
  VITE_APP_TITLE: string
  /** API 地址 */
  VITE_API_URL: string
  /** 基础路径 */
  VITE_BASE_PATH: string
  /** 端口号 */
  VITE_PORT: number
  /** 代理配置 */
  VITE_PROXY: [string, string][]
  /** 是否使用 Mock */
  VITE_USE_MOCK: boolean
  /** 构建压缩类型 */
  VITE_BUILD_COMPRESS: 'brotli' | 'gzip' | 'none'
  /** 是否删除原文件 */
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  /** 是否移除 console */
  VITE_DROP_CONSOLE: boolean
  /** 路由加载模式 */
  VITE_ROUTE_LOAD_MODE: 'dynamic' | 'static'
}

declare module 'vue' {
  type JSXComponent<Props = any> =
    | FunctionalComponent<Props>
    | { new (): ComponentPublicInstance<Props> }
}

// JSX
export namespace JSX {
  // tslint:disable no-empty-interface
  type Element = VNode
  // tslint:disable no-empty-interface
  type ElementClass = ComponentRenderProxy

  interface ElementAttributesProperty {
    $props: any
  }

  interface IntrinsicElements {
    [elem: string]: any
  }

  interface IntrinsicAttributes {
    [elem: string]: any
  }
}

/**
 * Vue 系统类型
 */

// Vue 节点类型
export type VueNode = JSX.Element | VNodeChild

// Vue 属性类型
export type PropType<T> = VuePropType<T>

// 可写类型
export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

// 超时句柄类型
export type TimeoutHandle = ReturnType<typeof setTimeout>

// 定时器句柄类型
export type IntervalHandle = ReturnType<typeof setInterval>

// 变更事件接口
export interface ChangeEvent extends Event {
  target: HTMLInputElement
}

// 滚轮事件接口
export interface WheelEvent {
  path?: EventTarget[]
}

export type Nullable<T> = null | T
export type NonNullable<T> = T extends null | undefined ? never : T

export type Recordable<T = any> = Record<string, T>
export type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

export type Indexable<T = any> = {
  [key: string]: T
}
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export interface ImportMetaEnv extends ViteEnv {
  __: unknown
}

export function parseInt(s: number | string, radix?: number): number
export function parseFloat(string: number | string): number
