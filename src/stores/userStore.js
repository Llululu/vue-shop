// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import {useCartStore} from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})

  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ( account, password ) => {
      const res = await loginAPI( account, password )
      userInfo.value = res.result
      // 合并购物车
      // mergeCartAPI(cartStore.cartList.map(item => {
      //   return {
      //     skuId: item.skuId,
      //     selected: item.selected,
      //     count: item.count
      //   }
      // }))
      // cartStore.updateNewList()
  }

  const cartStore = useCartStore()
   // 退出时清除用户信息和购物车
  const clearUserInfo = () => {
    // console.log('清除用户数据');
    userInfo.value = {}
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, 
// 持久化，同步到localstorage
{persist: true})