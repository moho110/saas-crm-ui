import request from '@/utils/request'

// 查询支付状态列表
export function listPaystate(query) {
  return request({
    url: '/crm-finance/paystate/list',
    method: 'get',
    params: query
  })
}

// 查询支付状态详细
export function getPaystate(id) {
  return request({
    url: '/crm-finance/paystate/' + id,
    method: 'get'
  })
}

// 新增支付状态
export function addPaystate(data) {
  return request({
    url: '/crm-finance/paystate',
    method: 'post',
    data: data
  })
}

// 修改支付状态
export function updatePaystate(data) {
  return request({
    url: '/crm-finance/paystate',
    method: 'put',
    data: data
  })
}

// 删除支付状态
export function delPaystate(id) {
  return request({
    url: '/crm-finance/paystate/' + id,
    method: 'delete'
  })
}
