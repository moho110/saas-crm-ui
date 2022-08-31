import request from '@/utils/request'

// 查询客户移除列表
export function listCustomermove(query) {
  return request({
    url: '/crm-customer/customermove/list',
    method: 'get',
    params: query
  })
}

// 查询客户移除详细
export function getCustomermove(id) {
  return request({
    url: '/crm-customer/customermove/' + id,
    method: 'get'
  })
}

// 新增客户移除
export function addCustomermove(data) {
  return request({
    url: '/crm-customer/customermove',
    method: 'post',
    data: data
  })
}

// 修改客户移除
export function updateCustomermove(data) {
  return request({
    url: '/crm-customer/customermove',
    method: 'put',
    data: data
  })
}

// 删除客户移除
export function delCustomermove(id) {
  return request({
    url: '/crm-customer/customermove/' + id,
    method: 'delete'
  })
}
