import request from '@/utils/request'

// 查询客户需求列表
export function listXuqiu(query) {
  return request({
    url: '/crm-customer/xuqiu/list',
    method: 'get',
    params: query
  })
}

// 查询客户需求详细
export function getXuqiu(id) {
  return request({
    url: '/crm-customer/xuqiu/' + id,
    method: 'get'
  })
}

// 新增客户需求
export function addXuqiu(data) {
  return request({
    url: '/crm-customer/xuqiu',
    method: 'post',
    data: data
  })
}

// 修改客户需求
export function updateXuqiu(data) {
  return request({
    url: '/crm-customer/xuqiu',
    method: 'put',
    data: data
  })
}

// 删除客户需求
export function delXuqiu(id) {
  return request({
    url: '/crm-customer/xuqiu/' + id,
    method: 'delete'
  })
}
