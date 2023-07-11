 // 封装购物车模块

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { findNewCartListAPI, insertCartAPI, delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - cartList
  const cartList = ref([])

  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 2. 定义action - addCart
  // 添加购物车
  const addCart = async (goods) => {
    const { skuId, count } = goods
    // 登录
    if (isLogin.value) {
      // 登录之后的加入购车逻辑
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // 未登录
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count++
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  // 获取最新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find(item => item.skuId === skuId)
    item.selected = selected
  }

  // 全选
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 3. 定义getters
  // 总商品数
  const allCount = computed(() => {
    return cartList.value.reduce((a, c) => a + c.count, 0)
  })
  // 总价
  const allPrice = computed(() => {
    return cartList.value.reduce((a, c) => a + c.count * c.price, 0)
  })
  // 是否全选
  const isAll = computed(() => {
    return cartList.value.every(item => item.selected === true)
  })
  // 已选择总商品数
  const selectedCount = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0)
  })
  // 已选择总价
  const selectedPrice = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0)
  })
  return {
    cartList,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    updateNewList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice
  }
}, {
  persist: true,
})