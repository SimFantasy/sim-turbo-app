// 存储键名配置
export const STORAGE_KEYS = {
	TOKEN: 'token',
	REFRESH_TOKEN: 'refresh_token',
	USER_INFO: 'user_info',
	USER_ROLES: 'user_roles',
	LANGUAGE: 'language',
	THEME: 'theme'
} as const

// 存储配置
export const STORAGE_CONFIG = {
	PREFIX: 'sim_',
	EXPIRE: 1000 * 60 * 60 * 24 * 7 // 7天过期
} as const
