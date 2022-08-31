import request from '@/utils/request'

// 查询固定资产列表
export function listFixedasset(query) {
  return request({
    url: '/crm-political/fixedasset/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产详细
export function getFixedasset(id) {
  return request({
    url: '/crm-political/fixedasset/' + id,
    method: 'get'
  })
}

// 新增固定资产
export function addFixedasset(data) {
  return request({
    url: '/crm-political/fixedasset',
    method: 'post',
    data: data
  })
}

// 修改固定资产
export function updateFixedasset(data) {
  return request({
    url: '/crm-political/fixedasset',
    method: 'put',
    data: data
  })
}

// 删除固定资产
export function delFixedasset(id) {
  return request({
    url: '/crm-political/fixedasset/' + id,
    method: 'delete'
  })
}
