import { defineConfig } from 'tsup'

export default defineConfig({
	// 入口文件
	entry: ['src/index.ts'],

	// 输出格式
	format: ['esm', 'cjs'],

	// 启用类型声明文件生成
	dts: true,

	// 清理输出目录
	clean: true,

	// 输出目录
	outDir: 'dist',

	// 分割代码块
	splitting: true,

	// 生成 sourcemap
	sourcemap: true,

	// 不打包外部依赖
	external: [
		'eslint',
		'@typescript-eslint/eslint-plugin',
		'@typescript-eslint/parser',
		/^eslint-plugin-/,
		/^@eslint\//
	],

	// 目标环境
	target: 'node20',

	// 不压缩代码
	minify: true
})
