import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/home'

const useCounterStore = defineStore('category', {
  state: () => ({
    categoryList: []
  }),

  actions: {
    async getCategory() {
      const res = await getCategoryAPI()
      // console.log(res);
      this.categoryList = res.result
    }
  }
  
})

export default useCounterStore
