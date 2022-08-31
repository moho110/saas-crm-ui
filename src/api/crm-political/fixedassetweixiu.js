import request from '@/utils/request'

// 查询固定资产维修列表
export function listFixedassetweixiu(query) {
  return request({
    url: '/crm-political/fixedassetweixiu/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产维修详细
export function getFixedassetweixiu(id) {
  return request({
    url: '/crm-political/fixedassetweixiu/' + id,
    method: 'get'
  })
}

// 新增固定资产维修
export function addFixedassetweixiu(data) {
  return request({
    url: '/crm-political/fixedassetweixiu',
    method: 'post',
    data: data
  })
}

// 修改固定资产维修
export function updateFixedassetweixiu(data) {
  return request({
    url: '/crm-political/fixedassetweixiu',
    method: 'put',
    data: data
  })
}

// 删除固定资产维修
export function delFixedassetweixiu(id) {
  return request({
    url: '/crm-political/fixedassetweixiu/' + id,
    method: 'delete'
  })
}
