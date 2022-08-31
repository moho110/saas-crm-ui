import request from '@/utils/request'

// 查询积分兑换列表
export function listExchange(query) {
  return request({
    url: '/crm-sales/exchange/list',
    method: 'get',
    params: query
  })
}

// 查询积分兑换详细
export function getExchange(id) {
  return request({
    url: '/crm-sales/exchange/' + id,
    method: 'get'
  })
}

// 新增积分兑换
export function addExchange(data) {
  return request({
    url: '/crm-sales/exchange',
    method: 'post',
    data: data
  })
}

// 修改积分兑换
export function updateExchange(data) {
  return request({
    url: '/crm-sales/exchange',
    method: 'put',
    data: data
  })
}

// 删除积分兑换
export function delExchange(id) {
  return request({
    url: '/crm-sales/exchange/' + id,
    method: 'delete'
  })
}
