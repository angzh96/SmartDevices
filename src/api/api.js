import request from '@/utils/request'

var baseURL = ''

export function sendGetRequest(url, data) {
    return request({
        url: baseURL + url,
        method: 'get',
        params: data
    })
}

export function sendPostRequest(url, data) {
    return request({
        url: baseURL + url,
        method: 'post',
        data: data
    })
}
export function sendPutRequest(url, data) {
    return request({
        url: baseURL + url,
        method: 'put',
        data: data
    })
}
export function sendDeleteRequest(url, data) {
    return request({
        url: baseURL + url,
        method: 'delete',
        data: data
    })
}
