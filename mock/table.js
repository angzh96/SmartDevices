import Mock from 'mockjs'

// data是无人机的数据
const data = Mock.mock({
  'items|5': [{
    carID: '@id()',
    type: '@word(20)',
    owner: 'admin',
    'electricity|1-100': 1,
    // 'state|1': ['已连接', '正在连接', '无法连接', '已断开']
    // 0:断开，1:已连接
    'state|0-1': 2
  }]
})
const data1 = Mock.mock({
  'items|4': [{
    Number: '@id()',
    Type: '@word(20)',
    Owner: 'admin',
    'Electricity|1-100': 1,
    'State|1': ['已连接', '正在连接', '无法连接', '已断开']
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'post',
    response: config => {
      const type = config.body.type
      const items1 = data.items
      const items2 = data1.items

      console.log(config.body.type)
      console.log(items1)

      if (type === 0) {
        return {
          code: 20000,
          data: {
            total: items1.length,
            items: items1
          }
        }
      } else if (type === 1) {
        return {
          code: 20000,
          data: {
            total: items2.length,
            items: items2
          }
        }
      } else {
        return {
          code: 500,
          data: 'error'
        }
      }
    }
  },
  {
    url: '/vue-admin-template/table/addInfo',
    type: 'post',
    response: config => {
      console.log(config.body)
      console.log(data)
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/editInfo',
    type: 'post',
    response: config => {
      console.log(config.body)
      console.log(data)
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/deleteInfo',
    type: 'post',
    response: config => {
      console.log(config.body)
      console.log(data)
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/table/unconnect',
    type: 'post',
    response: config => {
      console.log(config.body)
      console.log(data)
      return {
        code: 20000,
        msg: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/connect/connect',
    type: 'post',
    response: config => {
      console.log(config.body)
      console.log(data)
      return {
        code: 20000,
        msg: 'success'
      }
    }
  }
]
