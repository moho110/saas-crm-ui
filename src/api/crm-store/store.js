import request from '@/utils/request'

// 查询库存列表
export function listStore(query) {
  return request({
    url: '/crm-store/store/list',
    method: 'get',
    params: query
  })
}

// 查询库存详细
export function getStore(id) {
  return request({
    url: '/crm-store/store/' + id,
    method: 'get'
  })
}

// 新增库存
export function addStore(data) {
  return request({
    url: '/crm-store/store',
    method: 'post',
    data: data
  })
}

// 修改库存
export function updateStore(data) {
  return request({
    url: '/crm-store/store',
    method: 'put',
    data: data
  })
}

// 删除库存
export function delStore(id) {
  return request({
    url: '/crm-store/store/' + id,
    method: 'delete'
  })
}
