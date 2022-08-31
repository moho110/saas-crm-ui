import request from '@/utils/request'

// 查询库存盘点列表
export function listStorecheck(query) {
  return request({
    url: '/crm-store/storecheck/list',
    method: 'get',
    params: query
  })
}

// 查询库存盘点详细
export function getStorecheck(id) {
  return request({
    url: '/crm-store/storecheck/' + id,
    method: 'get'
  })
}

// 新增库存盘点
export function addStorecheck(data) {
  return request({
    url: '/crm-store/storecheck',
    method: 'post',
    data: data
  })
}

// 修改库存盘点
export function updateStorecheck(data) {
  return request({
    url: '/crm-store/storecheck',
    method: 'put',
    data: data
  })
}

// 删除库存盘点
export function delStorecheck(id) {
  return request({
    url: '/crm-store/storecheck/' + id,
    method: 'delete'
  })
}
