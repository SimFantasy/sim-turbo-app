/**
 * tsup 构建配置
 * 用于构建 Vite 配置包
 */

import { defineConfig } from 'tsup'

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		base: 'src/configs/base.ts',
		vue: 'src/configs/vue.ts'
	},
	format: ['esm', 'cjs'],
	dts: true,
	clean: true,
	splitting: false,
	sourcemap: true,
	minify: false,
	external: [
		'vite',
		'@vitejs/plugin-vue',
		'@vitejs/plugin-vue-jsx',
		'@tailwindcss/vite',
		'unplugin-auto-import',
		'unplugin-vue-components',
		'unplugin-icons',
		'vite-plugin-vue-devtools',
		'vite-plugin-mock',
		'vite-plugin-compression',
		'vite-plugin-progress',
		'vite-plugin-image-optimizer',
		'vite-svg-loader',
		'vite-plugin-vue-setup-extend',
		'naive-ui',
		'@iconify/vue',
		'dayjs',
		'dotenv'
	]
})
