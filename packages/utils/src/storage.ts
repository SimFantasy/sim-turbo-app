import { STORAGE_CONFIG } from "@sim/constants";

// 存储类型定义
export type StorageType = "localStorage" | "sessionStorage" | "cookie";

// 存储项接口
interface StorageItem<T = any> {
  value: T;
  expire: number; // 过期时间戳
}

// Cookie 配置接口
interface CookieOptions {
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

// Storage 类配置接口
interface StorageConfig {
  storageKey: string; // 必需的存储键
  storageType?: StorageType;
  storagePrefix?: string;
  expire?: number;
  cookieOptions?: CookieOptions;
}

/**
 * 通用存储类，支持 localStorage、sessionStorage 和 cookie
 * 在构造时指定 storageKey，后续操作都基于这个 key
 */
export class Storage {
  private storageType: StorageType;
  private storageKey: string;
  private storagePrefix: string;
  private defaultExpire: number;
  private cookieOptions: CookieOptions;
  private fullKey: string; // 完整的存储键名

  /**
   * 构造函数
   * @param config 存储配置，storageKey 为必需参数
   */
  constructor(config: StorageConfig) {
    this.storageType = config.storageType || "localStorage";
    this.storageKey = config.storageKey;
    this.storagePrefix = config.storagePrefix || "";
    this.defaultExpire = config.expire || STORAGE_CONFIG.EXPIRE;
    this.cookieOptions = {
      path: "/",
      secure: false,
      sameSite: "lax",
      ...config.cookieOptions,
    };
    // 预计算完整的存储键名
    this.fullKey = `${this.storagePrefix}${this.storageKey}`;
  }

  /**
   * 获取当前时间戳
   * @returns 当前时间戳
   */
  private getCurrentTime(): number {
    return Date.now();
  }

  /**
   * 检查项是否过期
   * @param item 存储项
   * @returns 是否过期
   */
  private isExpired(item: StorageItem): boolean {
    return this.getCurrentTime() > item.expire;
  }

  /**
   * 从 localStorage/sessionStorage 获取项
   * @returns 存储项或 null
   */
  private getFromWebStorage(): StorageItem | null {
    try {
      const storage =
        this.storageType === "localStorage" ? localStorage : sessionStorage;
      const item = storage.getItem(this.fullKey);
      if (!item) return null;
      return JSON.parse(item) as StorageItem;
    } catch (error) {
      console.error("获取存储项失败:", error);
      return null;
    }
  }

  /**
   * 设置到 localStorage/sessionStorage
   * @param item 存储项
   */
  private setToWebStorage(item: StorageItem): void {
    try {
      const storage =
        this.storageType === "localStorage" ? localStorage : sessionStorage;
      storage.setItem(this.fullKey, JSON.stringify(item));
    } catch (error) {
      console.error("设置存储项失败:", error);
    }
  }

  /**
   * 从 localStorage/sessionStorage 删除项
   */
  private removeFromWebStorage(): void {
    try {
      const storage =
        this.storageType === "localStorage" ? localStorage : sessionStorage;
      storage.removeItem(this.fullKey);
    } catch (error) {
      console.error("删除存储项失败:", error);
    }
  }

  /**
   * 从 cookie 获取项
   * @returns 存储项或 null
   */
  private getFromCookie(): StorageItem | null {
    try {
      const cookies = document.cookie.split(";");
      for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.trim().split("=");
        if (cookieKey === this.fullKey && cookieValue) {
          return JSON.parse(decodeURIComponent(cookieValue)) as StorageItem;
        }
      }
      return null;
    } catch (error) {
      console.error("获取 Cookie 失败:", error);
      return null;
    }
  }

  /**
   * 设置到 cookie
   * @param item 存储项
   */
  private setToCookie(item: StorageItem): void {
    try {
      const value = encodeURIComponent(JSON.stringify(item));
      const expireDate = new Date(item.expire);
      let cookieString = `${
        this.fullKey
      }=${value}; expires=${expireDate.toUTCString()}`;

      if (this.cookieOptions.path) {
        cookieString += `; path=${this.cookieOptions.path}`;
      }
      if (this.cookieOptions.domain) {
        cookieString += `; domain=${this.cookieOptions.domain}`;
      }
      if (this.cookieOptions.secure) {
        cookieString += "; secure";
      }
      if (this.cookieOptions.sameSite) {
        cookieString += `; samesite=${this.cookieOptions.sameSite}`;
      }

      document.cookie = cookieString;
    } catch (error) {
      console.error("设置 Cookie 失败:", error);
    }
  }

  /**
   * 从 cookie 删除项
   */
  private removeFromCookie(): void {
    try {
      let cookieString = `${this.fullKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
      if (this.cookieOptions.path) {
        cookieString += `; path=${this.cookieOptions.path}`;
      }
      if (this.cookieOptions.domain) {
        cookieString += `; domain=${this.cookieOptions.domain}`;
      }
      document.cookie = cookieString;
    } catch (error) {
      console.error("删除 Cookie 失败:", error);
    }
  }

  /**
   * 获取存储项
   * @param defaultValue 当项不存在或已过期时返回的默认值
   * @returns 值，如果项已过期或解析错误则返回默认值
   */
  getItem<T = any>(defaultValue?: T): T | undefined {
    let item: StorageItem | null = null;

    // 根据存储类型获取数据
    if (this.storageType === "cookie") {
      item = this.getFromCookie();
    } else {
      item = this.getFromWebStorage();
    }

    // 检查项是否存在
    if (!item) {
      return defaultValue;
    }

    // 检查是否过期
    if (this.isExpired(item)) {
      // 删除过期项
      this.removeItem();
      return defaultValue;
    }

    return item.value;
  }

  /**
   * 设置存储项
   * @param value 值
   * @param ttl 存活时间（毫秒），默认使用实例配置的过期时间
   */
  setItem<T = any>(value: T, ttl?: number): void {
    const expire = this.getCurrentTime() + (ttl || this.defaultExpire);
    const item: StorageItem<T> = { value, expire };

    // 根据存储类型设置数据
    if (this.storageType === "cookie") {
      this.setToCookie(item);
    } else {
      this.setToWebStorage(item);
    }
  }

  /**
   * 删除存储项
   */
  removeItem(): void {
    // 根据存储类型删除数据
    if (this.storageType === "cookie") {
      this.removeFromCookie();
    } else {
      this.removeFromWebStorage();
    }
  }

  /**
   * 清除当前存储项（等同于 removeItem）
   */
  clear(): void {
    this.removeItem();
  }

  /**
   * 清除过期的存储项（检查当前项是否过期，如果过期则删除）
   */
  clearExpiredItems(): void {
    let item: StorageItem | null = null;

    // 获取当前项
    if (this.storageType === "cookie") {
      item = this.getFromCookie();
    } else {
      item = this.getFromWebStorage();
    }

    // 如果项存在且已过期，则删除
    if (item && this.isExpired(item)) {
      this.removeItem();
    }
  }

  /**
   * 获取存储键信息
   * @returns 存储键信息
   */
  getStorageInfo() {
    return {
      storageType: this.storageType,
      storageKey: this.storageKey,
      storagePrefix: this.storagePrefix,
      fullKey: this.fullKey,
      defaultExpire: this.defaultExpire,
    };
  }
}

// 预定义的存储实例工厂函数
export const createStorage = (
  storageKey: string,
  options?: Omit<StorageConfig, "storageKey">
) => {
  return new Storage({
    storageKey,
    storageType: "localStorage",
    storagePrefix: STORAGE_CONFIG.PREFIX,
    expire: STORAGE_CONFIG.EXPIRE,
    ...options,
  });
};
