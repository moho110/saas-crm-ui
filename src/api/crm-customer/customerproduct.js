import request from '@/utils/request'

// 查询产品列表列表
export function listCustomerproduct(query) {
  return request({
    url: '/crm-customer/customerproduct/list',
    method: 'get',
    params: query
  })
}

// 查询产品列表详细
export function getCustomerproduct(id) {
  return request({
    url: '/crm-customer/customerproduct/' + id,
    method: 'get'
  })
}

// 新增产品列表
export function addCustomerproduct(data) {
  return request({
    url: '/crm-customer/customerproduct',
    method: 'post',
    data: data
  })
}

// 修改产品列表
export function updateCustomerproduct(data) {
  return request({
    url: '/crm-customer/customerproduct',
    method: 'put',
    data: data
  })
}

// 删除产品列表
export function delCustomerproduct(id) {
  return request({
    url: '/crm-customer/customerproduct/' + id,
    method: 'delete'
  })
}
