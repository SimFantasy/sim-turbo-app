import type { LoginParams, UserInfo } from '@sim/types'

import { computed, ref, unref } from 'vue'

import { message, tokenStorage, userStorage } from '@sim/utils'
import { defineStore } from 'pinia'

// import { useRouterStore } from './router'
import { useTabStore } from './tab'

export const useAuthStore = defineStore('auth-store', () => {
  // States
  const userInfo = ref<null | UserInfo>(userStorage.getItem() as null | UserInfo)
  const token = ref<null | string>(null)

  // Getters
  const isLogin = computed(() => Boolean(token.value))

  // Actions
  // 登录
  const login = async (
    params: LoginParams,
    loginApi?: (params: LoginParams) => Promise<any>,
    getUserInfoApi?: () => Promise<any>
  ) => {
    try {
      if (!loginApi) {
        console.warn('Login API not provided')
        return
      }

      // 发起请求
      const res = await loginApi(params)
      if (res.code === 200 && res.data) {
        // 保存token
        token.value = res.data.access_token
        tokenStorage.setItem(res.data.access_token)

        if (getUserInfoApi) {
          // 请求用户信息
          const userData = await getUserInfoApi()
          if (userData.code === 200 && userData.data) {
            // 保存用户信息
            userInfo.value = userData.data
            userStorage.setItem(userData.data)

            // 处理登录信息
            await handleLoginInfo()
          } else {
            message.error(userData.message)
          }
        } else {
          // 如果没有提供获取用户信息的API，直接处理登录信息
          await handleLoginInfo()
        }
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.warn('[login]', error)
    }
  }

  // 退出登录
  const logout = async (logoutApi?: () => Promise<any>, router?: any) => {
    try {
      if (logoutApi) {
        const res = await logoutApi()
        if (res.code !== 200) {
          console.warn('Logout API failed:', res.message)
        }
      }

      // 清空标签栏数据
      const tabStore = useTabStore()
      tabStore.clearAllTabs()

      // 清除登录信息
      clearAuthStore()

      // 跳转到登录页
      if (router) {
        const route = unref(router.currentRoute)
        if (route.meta.hasAuth) {
          router.push({
            name: 'Login',
            query: { redirect: route.fullPath }
          })
        }
      }
    } catch (error) {
      console.warn('[logout]', error)
    }
  }

  // 处理登录信息
  const handleLoginInfo = async (router?: any) => {
    // 添加路由和菜单
    // const routeStore = useRouterStore()
    // await routeStore.initAuthRoute(userInfo.value?.routes || [])

    // 进行重定向跳转
    if (router) {
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/'
      })
    }
  }

  // 清空Storage并重置authStore
  const clearAuthStore = () => {
    // 清除token
    token.value = ''
    tokenStorage.removeItem()
    // 清除用户信息
    userInfo.value = null
    userStorage.removeItem()
  }

  return {
    userInfo,
    token,
    isLogin,
    login,
    logout,
    handleLoginInfo,
    clearAuthStore
  }
})
