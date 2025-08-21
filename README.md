# Log

## 2025-08-21
- 配置@sim/types构建，添加lint配置，并进行build和lint检查，修复lint错误
- 修复@sim/vite-config中的构建问题，lint错误
- 给@sim/tsup-config添加lint配置文件，并检查、修复lint错误
- 给@sim/locale添加lint配置文件，并检查、修复lint错误
- 给@sim/utils添加lint配置文件，并检查、修复lint错误
- 添加根目录.editorconfig文件，统一代码风格
- 修改.vscode目录下的settings.json文件，确保prettier、eslint、editorconfig等插件的优先级
- 完成@sim/stores的处理，将构建工具从tsup改为unbuild，并修复类型定义错误。tsup对于类型较为复杂的构建时问题比较多，unbuild更适合这种场景。
