import request from '@/utils/request'

// 查询客户区域列表
export function listCustomerarea(query) {
  return request({
    url: '/crm-customer/customerarea/list',
    method: 'get',
    params: query
  })
}

// 查询客户区域详细
export function getCustomerarea(id) {
  return request({
    url: '/crm-customer/customerarea/' + id,
    method: 'get'
  })
}

// 新增客户区域
export function addCustomerarea(data) {
  return request({
    url: '/crm-customer/customerarea',
    method: 'post',
    data: data
  })
}

// 修改客户区域
export function updateCustomerarea(data) {
  return request({
    url: '/crm-customer/customerarea',
    method: 'put',
    data: data
  })
}

// 删除客户区域
export function delCustomerarea(id) {
  return request({
    url: '/crm-customer/customerarea/' + id,
    method: 'delete'
  })
}
