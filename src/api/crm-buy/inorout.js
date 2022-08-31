import request from '@/utils/request'

// 查询输入输出列表
export function listInorout(query) {
  return request({
    url: '/crm-buy/inorout/list',
    method: 'get',
    params: query
  })
}

// 查询输入输出详细
export function getInorout(id) {
  return request({
    url: '/crm-buy/inorout/' + id,
    method: 'get'
  })
}

// 新增输入输出
export function addInorout(data) {
  return request({
    url: '/crm-buy/inorout',
    method: 'post',
    data: data
  })
}

// 修改输入输出
export function updateInorout(data) {
  return request({
    url: '/crm-buy/inorout',
    method: 'put',
    data: data
  })
}

// 删除输入输出
export function delInorout(id) {
  return request({
    url: '/crm-buy/inorout/' + id,
    method: 'delete'
  })
}
