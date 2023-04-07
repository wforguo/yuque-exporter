/**
 * @Author: forguo
 * @Date: 2022/5/16 21:29
 * @Description: request.ts.js
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import consola from 'consola'

const request = axios.create({
    baseURL: '/api'
})

request.interceptors.request.use((config: AxiosRequestConfig | any) => {
    // 添加token
    config.headers['x-auth-token'] = window.localStorage.getItem('yuque_token') || ''
    return config
})

request.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 200 && res.data.code === 200) {
            return Promise.resolve(res.data)
        }
        consola.info('request.res -->', res)
        ElMessage.error(res.data?.message || res.statusText || '服务异常，请重试')
        return Promise.reject(res)
    },
    (e: any) => {
        consola.error('request.e -->', e)
        ElMessage.error(
            e?.response?.data?.message || e?.response?.message || e.message || e.statusText || '服务异常，请重试'
        )
        return Promise.reject(e)
    }
)

export default request
