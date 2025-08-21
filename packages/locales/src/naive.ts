import type { LanguageType } from '@sim/types'
import type { NDateLocale, NLocale } from 'naive-ui'

import { dateZhCN, zhCN } from 'naive-ui'

export const naiveI18nOptions: Record<
  LanguageType,
  { dateLocale: NDateLocale | null; locale: NLocale | null }
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
