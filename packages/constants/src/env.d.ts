/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 添加索引签名，允许访问其他 VITE_ 开头的环境变量
  readonly [key: string]: string | undefined

  readonly VITE_API_URL?: string
  readonly VITE_APP_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
