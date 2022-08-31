import request from '@/utils/request'

// 查询客户定义类型列表
export function listCustomerdefinetype(query) {
  return request({
    url: '/crm-customer/customerdefinetype/list',
    method: 'get',
    params: query
  })
}

// 查询客户定义类型详细
export function getCustomerdefinetype(id) {
  return request({
    url: '/crm-customer/customerdefinetype/' + id,
    method: 'get'
  })
}

// 新增客户定义类型
export function addCustomerdefinetype(data) {
  return request({
    url: '/crm-customer/customerdefinetype',
    method: 'post',
    data: data
  })
}

// 修改客户定义类型
export function updateCustomerdefinetype(data) {
  return request({
    url: '/crm-customer/customerdefinetype',
    method: 'put',
    data: data
  })
}

// 删除客户定义类型
export function delCustomerdefinetype(id) {
  return request({
    url: '/crm-customer/customerdefinetype/' + id,
    method: 'delete'
  })
}
