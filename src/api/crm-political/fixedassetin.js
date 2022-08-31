import request from '@/utils/request'

// 查询固定资产入库列表
export function listFixedassetin(query) {
  return request({
    url: '/crm-political/fixedassetin/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产入库详细
export function getFixedassetin(id) {
  return request({
    url: '/crm-political/fixedassetin/' + id,
    method: 'get'
  })
}

// 新增固定资产入库
export function addFixedassetin(data) {
  return request({
    url: '/crm-political/fixedassetin',
    method: 'post',
    data: data
  })
}

// 修改固定资产入库
export function updateFixedassetin(data) {
  return request({
    url: '/crm-political/fixedassetin',
    method: 'put',
    data: data
  })
}

// 删除固定资产入库
export function delFixedassetin(id) {
  return request({
    url: '/crm-political/fixedassetin/' + id,
    method: 'delete'
  })
}
