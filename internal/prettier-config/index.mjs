export default {
  // 与 .editorconfig 保持一致的设置
  printWidth: 100, // 对应 max_line_length
  tabWidth: 2, // 对应 indent_size
  useTabs: false, // 对应 indent_style=space
  endOfLine: 'lf', // 对应 end_of_line=lf

  // Prettier 特有的格式化规则
  semi: false, // 不添加分号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: true, // JSX 中也使用单引号
  trailingComma: 'none', // 不添加尾随逗号
  bracketSpacing: true, // 对象括号内添加空格
  arrowParens: 'avoid', // 箭头函数参数避免括号

  // 特殊文件类型覆盖
  overrides: [
    {
      files: ['*.json5'],
      options: {
        quoteProps: 'preserve',
        singleQuote: false // JSON5 中使用双引号
      }
    },
    {
      files: ['*.json'],
      options: {
        singleQuote: false // 标准 JSON 必须使用双引号
      }
    }
  ],

  // 其他设置
  jsxBracketSameLine: false,
  insertPragma: false,
  proseWrap: 'never'
}
