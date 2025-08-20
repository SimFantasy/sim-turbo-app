/**
 * 环境变量获取工具
 * 兼容不同的模块系统和构建环境
 */

/**
 * 获取环境变量值
 * @param key 环境变量键名
 * @param defaultValue 默认值
 * @returns 环境变量值或默认值
 */
export function getEnvVar(key: string, defaultValue: string): string {
  // 在浏览器/ESM 环境中使用 import.meta.env
  // 使用动态访问避免 CommonJS 构建时的警告
  if (typeof window !== "undefined") {
    try {
      // 动态访问 import.meta 避免构建时解析
      const importMeta =
        (globalThis as any).import?.meta || (global as any).import?.meta;
      if (importMeta && importMeta.env) {
        const envValue = importMeta.env[key];
        return envValue || defaultValue;
      }
    } catch {
      // 如果访问失败，继续到下一个检查
    }
  }

  // 在 Node.js/CommonJS 环境中使用 process.env
  if (typeof process !== "undefined" && process.env) {
    return process.env[key] || defaultValue;
  }

  // 回退到默认值
  return defaultValue;
}

/**
 * 应用相关的环境变量
 */
export const ENV = {
  APP_NAME: getEnvVar("VITE_APP_NAME", "Sim Turbo Admin"),
  API_URL: getEnvVar("VITE_API_URL", "http://localhost:5173"),
} as const;
