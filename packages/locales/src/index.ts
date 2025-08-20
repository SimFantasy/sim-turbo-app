import { createI18n } from 'vue-i18n'

import { languageStorage, DEFAULT_CONFIG } from '@sim/constants'
import type { LanguageType } from '@sim/types'

import { zhCN } from './lang/zh-cn'
import { enUS } from './lang/en-us'

/**
 * 创建 i18n 实例
 * @param defaultLanguage 默认语言
 * @param currentLanguage 当前语言
 * @returns i18n 实例
 *
 * @example
 * ```typescript
 * import { createI18nInstance } from '@sim/locales'
 *
 * const i18n = createI18nInstance('zhCN', 'zhCN')
 * ```
 */
export function createI18nInstance(
	defaultLanguage: LanguageType = languageStorage.getItem() || DEFAULT_CONFIG.LANGUAGE,
	currentLanguage: LanguageType = DEFAULT_CONFIG.LANGUAGE
) {
	const instance = createI18n({
		legacy: false,
		locale: currentLanguage || defaultLanguage,
		fallbackLocale: defaultLanguage,
		messages: {
			zhCN,
			enUS
		},
		// missingWarn: false, // 缺失国际化警告
		fallbackWarn: false // 缺失回退内容警告
	})

	return instance
}

/**
 * 设置语言
 * @param locale 语言类型
 * @param i18nInstance i18n 实例
 *
 * @example
 * ```typescript
 * import { setLocale } from '@sim/locales'
 *
 * setLocale('enUS', i18n)
 * ```
 */
export function setLocale(locale: LanguageType, i18nInstance: any) {
	if (i18nInstance && i18nInstance.global) {
		i18nInstance.global.locale.value = locale
	}
}

// 导出语言包
export { zhCN, enUS }

// 导出 Naive UI 多语言配置
export { naiveI18nOptions } from './naive'
