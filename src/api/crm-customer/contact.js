import request from '@/utils/request'

// 查询联系方式列表
export function listContact(query) {
  return request({
    url: '/crm-customer/contact/list',
    method: 'get',
    params: query
  })
}

// 查询联系方式详细
export function getContact(id) {
  return request({
    url: '/crm-customer/contact/' + id,
    method: 'get'
  })
}

// 新增联系方式
export function addContact(data) {
  return request({
    url: '/crm-customer/contact',
    method: 'post',
    data: data
  })
}

// 修改联系方式
export function updateContact(data) {
  return request({
    url: '/crm-customer/contact',
    method: 'put',
    data: data
  })
}

// 删除联系方式
export function delContact(id) {
  return request({
    url: '/crm-customer/contact/' + id,
    method: 'delete'
  })
}
