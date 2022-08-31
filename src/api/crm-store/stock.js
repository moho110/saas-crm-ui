import request from '@/utils/request'

// 查询仓库管理列表
export function listStock(query) {
  return request({
    url: '/crm-store/stock/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理详细
export function getStock(id) {
  return request({
    url: '/crm-store/stock/' + id,
    method: 'get'
  })
}

// 新增仓库管理
export function addStock(data) {
  return request({
    url: '/crm-store/stock',
    method: 'post',
    data: data
  })
}

// 修改仓库管理
export function updateStock(data) {
  return request({
    url: '/crm-store/stock',
    method: 'put',
    data: data
  })
}

// 删除仓库管理
export function delStock(id) {
  return request({
    url: '/crm-store/stock/' + id,
    method: 'delete'
  })
}
