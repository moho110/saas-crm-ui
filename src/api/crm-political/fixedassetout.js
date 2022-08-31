import request from '@/utils/request'

// 查询固定资产出库列表
export function listFixedassetout(query) {
  return request({
    url: '/crm-political/fixedassetout/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产出库详细
export function getFixedassetout(id) {
  return request({
    url: '/crm-political/fixedassetout/' + id,
    method: 'get'
  })
}

// 新增固定资产出库
export function addFixedassetout(data) {
  return request({
    url: '/crm-political/fixedassetout',
    method: 'post',
    data: data
  })
}

// 修改固定资产出库
export function updateFixedassetout(data) {
  return request({
    url: '/crm-political/fixedassetout',
    method: 'put',
    data: data
  })
}

// 删除固定资产出库
export function delFixedassetout(id) {
  return request({
    url: '/crm-political/fixedassetout/' + id,
    method: 'delete'
  })
}
