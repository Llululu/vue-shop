import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/userStore"
import router from '@/router'

const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    // 2. 按照后端的要求拼接token数据
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// 响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    // useRouter只能在setup函数中使用
    // const router = useRouter()

    // 统一错误提示
    ElMessage({type: 'warning', message: e.response.data.message})

    // token失效处理
    if (e.response.status === 401) {
        // 1.清除本地用户数据
        userStore.clearUserInfo()
        // 2.跳转到登录页
        router.push('/login')
    }
    

    return Promise.reject(e)
})

export default httpInstance