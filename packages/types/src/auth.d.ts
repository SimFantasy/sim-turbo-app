/**
 * 认证相关类型定义
 */

/**
 * 登录响应接口
 */
export interface LoginResponse {
  access_token: string
  expires_in: number
}

/**
 * 登录参数接口
 */
export interface LoginParams {
  username: string
  password: string
  remember?: boolean
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: string
  username: string
  email: string
  nickname?: string
  avatar?: string
  roles: string[]
  permissions: string[]
  status: 'active' | 'banned' | 'inactive'
  createdAt: string
  updatedAt: string
}

/**
 * 原始登录参数接口（保留兼容性）
 */
export interface LegacyLoginParams {
  email: string
  psw: string
}

/**
 * 注册参数接口
 */
export interface RegisterParams {
  address: string
  city: string
  country: string
  email: string
  firstname: string
  language: string
  lastname: string
  psw: string
  repeatPsw: string
  zipCode: number
}

/**
 * 重置密码参数接口
 */
export interface ResetPasswordParams {
  code: string
  psw: string
  repeatPsw: string
}

/**
 * 找回密码发送邮件参数接口
 */
export interface FindePasswordSendEmailParams {
  code: string
  email: string
  networkId: string
  type: number
}

/**
 * 发送注册邮件参数接口
 */
export interface SendRegisterEmailParams {
  code: string
  email: string
  networkId: string
  type: number
}
