import axios from 'axios'

// 创建axios实例
const workApi = axios.create({
    baseURL: 'http://192.168.43.69:8080/api/v1/works',
    timeout: 5000
})

export const getAllWorks = () => {
    return workApi.get('/all')
}

export const getWorkDetails = (workname) => {
    return workApi.get('/details', {
        params: { workname }
    })
}

export const getWorksByClassify = (classify) => {
    return workApi.get('/classify', {
        params: { classify }
    })
} 