import type { ColorModeType, LanguageType, TransitionAnimationType } from '@sim/types'

import { computed, nextTick, ref } from 'vue'

import { DEFAULT_CONFIG, NAIVE_THEME } from '@sim/constants'
import { setLocale } from '@sim/locales'
import { languageStorage } from '@sim/utils'
import { useColorMode, useFullscreen } from '@vueuse/core'
import { colord } from 'colord'
import { set } from 'es-toolkit/compat'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-store', () => {
  const docElement = ref(document.documentElement)
  const { isFullscreen, toggle } = useFullscreen(docElement)
  const { system, store } = useColorMode({ emitAuto: true })

  // States
  const language = ref<LanguageType>(DEFAULT_CONFIG.LANGUAGE)
  const theme = ref(NAIVE_THEME)
  const primaryColor = ref<string>(NAIVE_THEME.common.primaryColor)
  const collapsed = ref(false)
  const loadFlag = ref(false)
  const transitionAnimation = ref<TransitionAnimationType>(DEFAULT_CONFIG.TRANSITION_ANIMATION)
  const contentFullScreen = ref(false)
  const showCollapseButton = ref(true)
  const showLogo = ref(true)
  const showTabs = ref(true)
  const showLoadingBar = ref(true)
  const showBreadcrumb = ref(true)
  const showBreadcrumbIcon = ref(true)
  const showSettings = ref(false)
  const showWatermark = ref(false)

  // Getters
  const storeColorMode = computed(() => store.value)
  const colorMode = computed(() => (store.value === 'auto' ? system.value : store.value))
  const fullScreen = computed(() => isFullscreen.value)

  // Actions
  const resetState = () => {
    theme.value = NAIVE_THEME
    primaryColor.value = NAIVE_THEME.common.primaryColor
    collapsed.value = false
    loadFlag.value = false
    transitionAnimation.value = DEFAULT_CONFIG.TRANSITION_ANIMATION
    contentFullScreen.value = false
    showCollapseButton.value = true
    showLogo.value = true
    showTabs.value = true
    showLoadingBar.value = true
    showBreadcrumb.value = true
    showBreadcrumbIcon.value = true
    showSettings.value = false
    showWatermark.value = false

    // 重置主题色
    setPrimaryColor(primaryColor.value)
  }

  // 设置主题色
  const setPrimaryColor = (color: string) => {
    const brightenColor = colord(color).lighten(0.05).toHex()
    const darkenColor = colord(color).darken(0.05).toHex()

    set(theme.value, 'common.primaryColor', color)
    set(theme.value, 'common.primaryColorHover', brightenColor)
    set(theme.value, 'common.primaryColorPressed', darkenColor)
    set(theme.value, 'common.primaryColorSuppl', brightenColor)
  }

  // 设置暗黑模式
  const setColorMode = (mode: ColorModeType) => {
    store.value = mode
  }

  // 设置语言
  const setLanguage = (lang: LanguageType) => {
    languageStorage.setItem(lang)
    try {
      setLocale(lang, null)
    } catch (error) {
      console.warn('setLocale function not available:', error)
    }
    language.value = lang
  }

  // 显示/隐藏侧边栏
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value
  }

  // 切换全屏
  const toggleFullScreen = () => {
    toggle()
  }

  // 页面内容重载
  const reloadPage = async (delay: number = 600) => {
    loadFlag.value = false
    await nextTick()
    if (delay) {
      setTimeout(() => {
        loadFlag.value = true
      }, delay)
    } else {
      loadFlag.value = true
    }
  }

  return {
    language,
    theme,
    primaryColor,
    collapsed,
    loadFlag,
    transitionAnimation,
    contentFullScreen,
    showCollapseButton,
    showLogo,
    showTabs,
    showLoadingBar,
    showBreadcrumb,
    showBreadcrumbIcon,
    showSettings,
    showWatermark,
    storeColorMode,
    colorMode,
    fullScreen,
    resetState,
    setPrimaryColor,
    setColorMode,
    setLanguage,
    toggleCollapsed,
    toggleFullScreen,
    reloadPage
  }
})
