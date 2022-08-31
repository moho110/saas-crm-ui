import request from '@/utils/request'

// 查询产品明细表列表
export function listCustomerdetail(query) {
  return request({
    url: '/crm-customer/customerdetail/list',
    method: 'get',
    params: query
  })
}

// 查询产品明细表详细
export function getCustomerdetail(id) {
  return request({
    url: '/crm-customer/customerdetail/' + id,
    method: 'get'
  })
}

// 新增产品明细表
export function addCustomerdetail(data) {
  return request({
    url: '/crm-customer/customerdetail',
    method: 'post',
    data: data
  })
}

// 修改产品明细表
export function updateCustomerdetail(data) {
  return request({
    url: '/crm-customer/customerdetail',
    method: 'put',
    data: data
  })
}

// 删除产品明细表
export function delCustomerdetail(id) {
  return request({
    url: '/crm-customer/customerdetail/' + id,
    method: 'delete'
  })
}
