import request from '@/utils/request'

export function register(data) {
  return request({
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}
