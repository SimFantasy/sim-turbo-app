/**
 * Vite 配置工具函数
 * 迁移自 sim-admin/build/utils.ts
 */

import type { ViteEnv } from '../types'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

/**
 * 判断是否为开发模式
 *
 * @param mode 模式字符串
 * @returns 是否为开发模式
 */
export function isDevMode(mode: string): boolean {
	return mode === 'development'
}

/**
 * 判断是否为生产模式
 *
 * @param mode 模式字符串
 * @returns 是否为生产模式
 */
export function isProdMode(mode: string): boolean {
	return mode === 'production'
}

/**
 * 判断是否为报告模式
 *
 * @returns 是否为报告模式
 */
export function isReportMode(): boolean {
	return process.env['REPORT'] === 'true' // 使用方括号语法访问环境变量
}

/**
 * 包装环境变量配置
 * 读取所有环境变量配置文件到 process.env
 *
 * @param envConf 环境变量配置对象
 * @returns 处理后的环境变量
 *
 * @example
 * ```typescript
 * const env = loadEnv(mode, root)
 * const viteEnv = wrapperEnv(env)
 * ```
 */
export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
	const ret: any = {}

	for (const envName of Object.keys(envConf)) {
		let realName = envConf[envName].replace(/\\n/g, '\n')
		realName = realName === 'true' ? true : realName === 'false' ? false : realName

		if (envName === 'VITE_PORT') {
			realName = Number(realName)
		}
		if (envName === 'VITE_PROXY') {
			try {
				realName = JSON.parse(realName)
			} catch (error) {
				console.warn(`解析 VITE_PROXY 失败:`, error)
				realName = []
			}
		}
		ret[envName] = realName
		process.env[envName] = realName
	}
	return ret
}

/**
 * 获取指定前缀的环境变量
 *
 * @param match 前缀匹配字符串
 * @param confFiles 配置文件列表
 * @returns 匹配的环境变量配置
 *
 * @example
 * ```typescript
 * const config = getEnvConfig('VITE_GLOB_', ['.env', '.env.production'])
 * ```
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = ['.env', '.env.production']) {
	let envConfig = {}
	confFiles.forEach(item => {
		try {
			const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
			envConfig = { ...envConfig, ...env }
		} catch (error) {
			// 文件不存在时忽略错误
			console.log('error', error)
		}
	})

	Object.keys(envConfig).forEach(key => {
		const reg = new RegExp(`^(${match})`)
		if (!reg.test(key)) {
			Reflect.deleteProperty(envConfig, key)
		}
	})
	return envConfig
}

/**
 * 获取用户根目录路径
 *
 * @param dir 目录路径
 * @returns 完整路径
 *
 * @example
 * ```typescript
 * const rootPath = getRootPath('src', 'components')
 * ```
 */
export function getRootPath(...dir: string[]) {
	return path.resolve(process.cwd(), ...dir)
}
