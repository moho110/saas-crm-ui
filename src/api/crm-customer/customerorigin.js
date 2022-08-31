import request from '@/utils/request'

// 查询客户来源列表
export function listCustomerorigin(query) {
  return request({
    url: '/crm-customer/customerorigin/list',
    method: 'get',
    params: query
  })
}

// 查询客户来源详细
export function getCustomerorigin(id) {
  return request({
    url: '/crm-customer/customerorigin/' + id,
    method: 'get'
  })
}

// 新增客户来源
export function addCustomerorigin(data) {
  return request({
    url: '/crm-customer/customerorigin',
    method: 'post',
    data: data
  })
}

// 修改客户来源
export function updateCustomerorigin(data) {
  return request({
    url: '/crm-customer/customerorigin',
    method: 'put',
    data: data
  })
}

// 删除客户来源
export function delCustomerorigin(id) {
  return request({
    url: '/crm-customer/customerorigin/' + id,
    method: 'delete'
  })
}
