import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	// 只构建 ESM 格式
	format: ['esm'],
	dts: true,
	clean: true,
	outDir: 'dist',
	splitting: false,
	sourcemap: true,
	external: [
		// 外部化所有可能导致动态 require 的包
		/^eslint/,
		/^@eslint/,
		/^@typescript-eslint/,
		/.*-eslint-parser$/,  // 匹配所有 eslint parser
		'vue-eslint-parser',
		'jsonc-eslint-parser',
		'eslint-config-turbo',  // 明确外部化 eslint-config-turbo
		'globals',
		'espree',
		'acorn'
	],
	target: 'node20',
	minify: false,
	platform: 'node'
})