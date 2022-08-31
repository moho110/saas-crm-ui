import request from '@/utils/request'

// 查询仓库管理调拔列表
export function listStockchangemain(query) {
  return request({
    url: '/crm-store/stockchangemain/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理调拔详细
export function getStockchangemain(id) {
  return request({
    url: '/crm-store/stockchangemain/' + id,
    method: 'get'
  })
}

// 新增仓库管理调拔
export function addStockchangemain(data) {
  return request({
    url: '/crm-store/stockchangemain',
    method: 'post',
    data: data
  })
}

// 修改仓库管理调拔
export function updateStockchangemain(data) {
  return request({
    url: '/crm-store/stockchangemain',
    method: 'put',
    data: data
  })
}

// 删除仓库管理调拔
export function delStockchangemain(id) {
  return request({
    url: '/crm-store/stockchangemain/' + id,
    method: 'delete'
  })
}
