import { createDiscreteApi } from 'naive-ui'

const { message, notification, dialog, loadingBar } = createDiscreteApi([
	'message',
	'dialog',
	'notification',
	'loadingBar'
])

// 全局信息提示/弹窗/加载进度条
export { message, notification, dialog, loadingBar }
