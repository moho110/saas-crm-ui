import request from '@/utils/request'

// 查询固定资产类别列表
export function listFixedassetleibie(query) {
  return request({
    url: '/crm-political/fixedassetleibie/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产类别详细
export function getFixedassetleibie(id) {
  return request({
    url: '/crm-political/fixedassetleibie/' + id,
    method: 'get'
  })
}

// 新增固定资产类别
export function addFixedassetleibie(data) {
  return request({
    url: '/crm-political/fixedassetleibie',
    method: 'post',
    data: data
  })
}

// 修改固定资产类别
export function updateFixedassetleibie(data) {
  return request({
    url: '/crm-political/fixedassetleibie',
    method: 'put',
    data: data
  })
}

// 删除固定资产类别
export function delFixedassetleibie(id) {
  return request({
    url: '/crm-political/fixedassetleibie/' + id,
    method: 'delete'
  })
}
