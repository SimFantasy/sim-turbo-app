/**
 * Vite 插件配置
 * 迁移自 sim-admin/build/plugins.ts
 */

import type { Plugin, PluginOption } from 'vite'

import type { ComponentResolver, VueViteOptions } from '../types'
// TailwindCSS
import tailwindcss from '@tailwindcss/vite'
// Vue 相关插件
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite'

import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

import { viteMockServe } from 'vite-plugin-mock'
// 其他插件
import progress from 'vite-plugin-progress'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import svgLoader from 'vite-svg-loader'
import { configCompressPlugin } from './compress'
// 内部工具
import { setupHtmlPlugin } from './html'

/**
 * Icon 组件解析器
 * 用于自动导入 @iconify/vue 的 Icon 组件
 */
const IconResolver: ComponentResolver = name => {
	if (name === 'Icon') {
		return {
			name: 'Icon',
			from: '@iconify/vue'
		}
	}
	return undefined
}

/**
 * 创建 Vite 插件列表
 *
 * @param options Vue Vite 配置选项
 * @returns Vite 插件数组
 */
export function createVitePlugins(
	options: VueViteOptions
): (Plugin | Plugin[] | PluginOption | PluginOption[])[] {
	const { plugins = {}, env, isBuild = false, buildTime = '' } = options

	const {
		jsx = true,
		devTools = true,
		tailwindcss: enableTailwind = true,
		mock = false,
		naiveUi = true,
		html = true,
		compress = false,
		i18n = true
	} = plugins

	const vitePlugins: (Plugin | Plugin[] | PluginOption | PluginOption[])[] = []

	// Vue 核心插件
	vitePlugins.push(vue())

	// JSX 支持
	if (jsx) {
		vitePlugins.push(vueJsx())
	}

	// 开发工具
	if (devTools && !isBuild) {
		vitePlugins.push(vueDevTools())
	}

	// Vue setup 扩展
	vitePlugins.push(vueSetupExtend())

	// TailwindCSS
	if (enableTailwind) {
		vitePlugins.push(tailwindcss())
	}

	// Mock 数据
	if (mock && env?.VITE_USE_MOCK) {
		vitePlugins.push(
			viteMockServe({
				mockPath: 'mock',
				enable: env.VITE_USE_MOCK,
				// supportTs: true,
				watchFiles: true
			})
		)
	}

	// 自动导入
	if (naiveUi || i18n) {
		// 正确配置 AutoImport 插件
		vitePlugins.push(
			AutoImport({
				dts: 'src/types/auto-imports.d.ts',
				// 使用对象形式配置，支持条件性导入
				imports: {
					// 预设库配置
					vue: ['ref', 'reactive', 'computed', 'watch', 'onMounted', 'onUnmounted'],
					'vue-router': ['useRouter', 'useRoute'],
					pinia: ['defineStore', 'storeToRefs'],
					'@vueuse/core': ['useStorage', 'useMouse', 'useLocalStorage'],
					// 条件性添加 i18n
					...(i18n ? { 'vue-i18n': ['useI18n'] } : {}),
					// 条件性添加 naiveUi 相关导入
					...(naiveUi
						? {
								'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
								'@iconify/vue': ['Icon']
						  }
						: {})
				}
			})
		)
	}

	// 组件自动导入
	if (naiveUi) {
		const resolvers = [NaiveUiResolver(), IconResolver]

		vitePlugins.push(
			Components({
				dts: 'src/types/components.d.ts',
				resolvers,
				dirs: ['src/components', 'src/views']
			})
		)
	}

	// 图标
	vitePlugins.push(
		Icons({
			compiler: 'vue3',
			autoInstall: true,
			scale: 1
		})
	)

	// SVG 加载器
	vitePlugins.push(svgLoader())

	// 构建进度
	vitePlugins.push(progress())

	// 图片优化
	vitePlugins.push(ViteImageOptimizer())

	// HTML 插件
	if (html && isBuild && buildTime) {
		vitePlugins.push(setupHtmlPlugin(buildTime))
	}

	// 压缩插件
	if (compress && isBuild && env?.VITE_BUILD_COMPRESS && env.VITE_BUILD_COMPRESS !== 'none') {
		vitePlugins.push(
			configCompressPlugin(env.VITE_BUILD_COMPRESS, env.VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
		)
	}

	return vitePlugins
}
