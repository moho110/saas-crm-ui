import request from '@/utils/request'

// 查询固定资产状态列表
export function listFixedassetstatus(query) {
  return request({
    url: '/crm-political/fixedassetstatus/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产状态详细
export function getFixedassetstatus(id) {
  return request({
    url: '/crm-political/fixedassetstatus/' + id,
    method: 'get'
  })
}

// 新增固定资产状态
export function addFixedassetstatus(data) {
  return request({
    url: '/crm-political/fixedassetstatus',
    method: 'post',
    data: data
  })
}

// 修改固定资产状态
export function updateFixedassetstatus(data) {
  return request({
    url: '/crm-political/fixedassetstatus',
    method: 'put',
    data: data
  })
}

// 删除固定资产状态
export function delFixedassetstatus(id) {
  return request({
    url: '/crm-political/fixedassetstatus/' + id,
    method: 'delete'
  })
}
