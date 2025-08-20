import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

/**
 * 使用@iconify/vue渲染图标
 * @param icon 图标名称，如： 'tabler:x'
 * @param props 图标属性，如： { class: 'size-4' }
 * @returns
 */
export function renderIcon(icon?: string, props?: import('naive-ui').IconProps) {
	if (!icon) return

	return () => h(NIcon, props, { default: () => h(Icon, { icon: icon }) })
}

export function renderSvgIcon(icon: string, props: import('naive-ui').IconProps) {
	return () => h(NIcon, props, { default: () => h('svg-icon', { icon: icon }) })
}
