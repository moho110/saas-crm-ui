import request from '@/utils/request'

// 查询婚否列表
export function listMarriage(query) {
  return request({
    url: '/crm-political/marriage/list',
    method: 'get',
    params: query
  })
}

// 查询婚否详细
export function getMarriage(id) {
  return request({
    url: '/crm-political/marriage/' + id,
    method: 'get'
  })
}

// 新增婚否
export function addMarriage(data) {
  return request({
    url: '/crm-political/marriage',
    method: 'post',
    data: data
  })
}

// 修改婚否
export function updateMarriage(data) {
  return request({
    url: '/crm-political/marriage',
    method: 'put',
    data: data
  })
}

// 删除婚否
export function delMarriage(id) {
  return request({
    url: '/crm-political/marriage/' + id,
    method: 'delete'
  })
}
