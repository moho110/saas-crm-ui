import request from '@/utils/request'

// 查询预付款记录列表
export function listAccessprepays(query) {
  return request({
    url: '/crm-finance/accessprepays/list',
    method: 'get',
    params: query
  })
}

// 查询预付款记录详细
export function getAccessprepays(id) {
  return request({
    url: '/crm-finance/accessprepays/' + id,
    method: 'get'
  })
}

// 新增预付款记录
export function addAccessprepays(data) {
  return request({
    url: '/crm-finance/accessprepays',
    method: 'post',
    data: data
  })
}

// 修改预付款记录
export function updateAccessprepays(data) {
  return request({
    url: '/crm-finance/accessprepays',
    method: 'put',
    data: data
  })
}

// 删除预付款记录
export function delAccessprepays(id) {
  return request({
    url: '/crm-finance/accessprepays/' + id,
    method: 'delete'
  })
}
