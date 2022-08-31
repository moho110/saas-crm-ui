import request from '@/utils/request'

// 查询客户等级列表
export function listCustomerlever(query) {
  return request({
    url: '/crm-customer/customerlever/list',
    method: 'get',
    params: query
  })
}

// 查询客户等级详细
export function getCustomerlever(id) {
  return request({
    url: '/crm-customer/customerlever/' + id,
    method: 'get'
  })
}

// 新增客户等级
export function addCustomerlever(data) {
  return request({
    url: '/crm-customer/customerlever',
    method: 'post',
    data: data
  })
}

// 修改客户等级
export function updateCustomerlever(data) {
  return request({
    url: '/crm-customer/customerlever',
    method: 'put',
    data: data
  })
}

// 删除客户等级
export function delCustomerlever(id) {
  return request({
    url: '/crm-customer/customerlever/' + id,
    method: 'delete'
  })
}
