import { dateZhCN, zhCN } from 'naive-ui'
import type { NDateLocale, NLocale } from 'naive-ui'

import type { LanguageType } from '@sim/types'

export const naiveI18nOptions: Record<
	LanguageType,
	{ locale: NLocale | null; dateLocale: NDateLocale | null }
> = {
	zhCN: {
		locale: zhCN,
		dateLocale: dateZhCN
	},
	enUS: {
		locale: null,
		dateLocale: null
	}
}
