import request from '@/utils/request'

// 查询固定资产分类列表
export function listFixedassetgroup(query) {
  return request({
    url: '/crm-political/fixedassetgroup/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产分类详细
export function getFixedassetgroup(id) {
  return request({
    url: '/crm-political/fixedassetgroup/' + id,
    method: 'get'
  })
}

// 新增固定资产分类
export function addFixedassetgroup(data) {
  return request({
    url: '/crm-political/fixedassetgroup',
    method: 'post',
    data: data
  })
}

// 修改固定资产分类
export function updateFixedassetgroup(data) {
  return request({
    url: '/crm-political/fixedassetgroup',
    method: 'put',
    data: data
  })
}

// 删除固定资产分类
export function delFixedassetgroup(id) {
  return request({
    url: '/crm-political/fixedassetgroup/' + id,
    method: 'delete'
  })
}
