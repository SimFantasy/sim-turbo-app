import { h } from 'vue'

import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

/**
 * 使用@iconify/vue渲染图标
 * @param icon 图标名称，如： 'tabler:x'
 * @param props 图标属性，如： { class: 'size-4' }
 * @returns 返回渲染函数或 undefined
 */
export function renderIcon(icon?: string, props?: import('naive-ui').IconProps) {
  if (!icon) return

  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}

/**
 * 渲染 SVG 图标
 * @param icon SVG 图标名称
 * @param props 图标属性
 * @returns 返回渲染函数
 */
export function renderSvgIcon(icon: string, props: import('naive-ui').IconProps) {
  return () => h(NIcon, props, { default: () => h('svg-icon', { icon }) })
}
