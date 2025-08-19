/**
 * 构建时间工具函数
 * 迁移自 sim-admin/build/time.ts
 */

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

/**
 * 获取构建时间
 *
 * @param timeZone 时区，默认为 'Asia/Shanghai'
 * @param format 时间格式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化的构建时间字符串
 *
 * @example
 * ```typescript
 * const buildTime = getBuildTime()
 * console.log(buildTime) // '2024-01-15 14:30:25'
 * ```
 */
export function getBuildTime(timeZone = 'Asia/Shanghai', format = 'YYYY-MM-DD HH:mm:ss'): string {
	dayjs.extend(utc)
	dayjs.extend(timezone)

	const buildTime = dayjs.tz(Date.now(), timeZone).format(format)

	return buildTime
}
