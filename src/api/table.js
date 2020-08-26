import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'post',
    data
  })
}

export function addDeviceInfo(data) {
  return request({
    url: '/vue-admin-template/table/addInfo',
    method: 'post',
    data
  })
}

export function editDeviceInfo(data) {
  return request({
    url: '/vue-admin-template/table/editInfo',
    method: 'post',
    data
  })
}

export function deleteDeviceInfo(data) {
  return request({
    url: '/vue-admin-template/table/editInfo',
    method: 'post',
    data
  })
}

export function unconnectDevice(data) {
  return request({
    url: '/vue-admin-template/table/unconnect',
    method: 'post',
    data
  })
}

export function connectDevice(data) {
  return request({
    url: '/vue-admin-template/table/connect',
    method: 'post',
    data
  })
}
