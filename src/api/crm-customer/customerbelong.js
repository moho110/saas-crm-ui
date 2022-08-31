import request from '@/utils/request'

// 查询客户所属列表
export function listCustomerbelong(query) {
  return request({
    url: '/crm-customer/customerbelong/list',
    method: 'get',
    params: query
  })
}

// 查询客户所属详细
export function getCustomerbelong(id) {
  return request({
    url: '/crm-customer/customerbelong/' + id,
    method: 'get'
  })
}

// 新增客户所属
export function addCustomerbelong(data) {
  return request({
    url: '/crm-customer/customerbelong',
    method: 'post',
    data: data
  })
}

// 修改客户所属
export function updateCustomerbelong(data) {
  return request({
    url: '/crm-customer/customerbelong',
    method: 'put',
    data: data
  })
}

// 删除客户所属
export function delCustomerbelong(id) {
  return request({
    url: '/crm-customer/customerbelong/' + id,
    method: 'delete'
  })
}
