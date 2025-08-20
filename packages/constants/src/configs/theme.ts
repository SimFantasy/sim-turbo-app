/**
 *  Naive ui 自定义主题配置
 *  基于Shadcn/ui Theme 定制 https://ui.shadcn.com/colors
 *  primaryColor: emerald 500
 */
export const NAIVE_THEME = {
	common: {
		primaryColor: '#10b981',
		primaryColorHover: '#34d399',
		primaryColorPressed: '#059669',
		primaryColorSuppl: '#34d399',
		infoColor: '#3b82f6',
		infoColorHover: '#60a5fa',
		infoColorPressed: '#2563eb',
		infoColorSuppl: '#60a5fa',
		successColor: '#22c55e',
		successColorHover: '#34d399',
		successColorPressed: '#16a34a',
		successColorSuppl: '#34d399',
		warningColor: '#eab308',
		warningColorHover: '#facc15',
		warningColorPressed: '#ca8a04',
		warningColorSuppl: '#facc15',
		errorColor: '#ef4444',
		errorColorHover: '#f87171',
		errorColorPressed: '#dc2626',
		errorColorSuppl: '#f87171'
	}
} as const

// 主题模式
export const THEME_MODES = {
	LIGHT: 'light',
	DARK: 'dark',
	AUTO: 'auto'
} as const

// 布局配置
export const LAYOUT_CONFIG = {
	SIDE_WIDTH: 240,
	SIDE_COLLAPSED_WIDTH: 64,
	HEADER_HEIGHT: 56,
	TABS_HEIGHT: 40,
	SHOW_TABS: true,
	SHOW_BREADCRUMBS: true
}
