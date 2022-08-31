import request from '@/utils/request'

// 查询固定资产报废列表
export function listFixedassetbaofei(query) {
  return request({
    url: '/crm-political/fixedassetbaofei/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产报废详细
export function getFixedassetbaofei(id) {
  return request({
    url: '/crm-political/fixedassetbaofei/' + id,
    method: 'get'
  })
}

// 新增固定资产报废
export function addFixedassetbaofei(data) {
  return request({
    url: '/crm-political/fixedassetbaofei',
    method: 'post',
    data: data
  })
}

// 修改固定资产报废
export function updateFixedassetbaofei(data) {
  return request({
    url: '/crm-political/fixedassetbaofei',
    method: 'put',
    data: data
  })
}

// 删除固定资产报废
export function delFixedassetbaofei(id) {
  return request({
    url: '/crm-political/fixedassetbaofei/' + id,
    method: 'delete'
  })
}
