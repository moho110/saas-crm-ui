import request from '@/utils/request'

// 查询审核状态列表
export function listShenhezhuangtai(query) {
  return request({
    url: '/crm-customer/shenhezhuangtai/list',
    method: 'get',
    params: query
  })
}

// 查询审核状态详细
export function getShenhezhuangtai(id) {
  return request({
    url: '/crm-customer/shenhezhuangtai/' + id,
    method: 'get'
  })
}

// 新增审核状态
export function addShenhezhuangtai(data) {
  return request({
    url: '/crm-customer/shenhezhuangtai',
    method: 'post',
    data: data
  })
}

// 修改审核状态
export function updateShenhezhuangtai(data) {
  return request({
    url: '/crm-customer/shenhezhuangtai',
    method: 'put',
    data: data
  })
}

// 删除审核状态
export function delShenhezhuangtai(id) {
  return request({
    url: '/crm-customer/shenhezhuangtai/' + id,
    method: 'delete'
  })
}
