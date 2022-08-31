import request from '@/utils/request'

// 查询库存处理类型列表
export function listStoreaccesstype(query) {
  return request({
    url: '/crm-store/storeaccesstype/list',
    method: 'get',
    params: query
  })
}

// 查询库存处理类型详细
export function getStoreaccesstype(id) {
  return request({
    url: '/crm-store/storeaccesstype/' + id,
    method: 'get'
  })
}

// 新增库存处理类型
export function addStoreaccesstype(data) {
  return request({
    url: '/crm-store/storeaccesstype',
    method: 'post',
    data: data
  })
}

// 修改库存处理类型
export function updateStoreaccesstype(data) {
  return request({
    url: '/crm-store/storeaccesstype',
    method: 'put',
    data: data
  })
}

// 删除库存处理类型
export function delStoreaccesstype(id) {
  return request({
    url: '/crm-store/storeaccesstype/' + id,
    method: 'delete'
  })
}
