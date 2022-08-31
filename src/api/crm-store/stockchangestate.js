import request from '@/utils/request'

// 查询仓库管理调拔状态列表
export function listStockchangestate(query) {
  return request({
    url: '/crm-store/stockchangestate/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理调拔状态详细
export function getStockchangestate(id) {
  return request({
    url: '/crm-store/stockchangestate/' + id,
    method: 'get'
  })
}

// 新增仓库管理调拔状态
export function addStockchangestate(data) {
  return request({
    url: '/crm-store/stockchangestate',
    method: 'post',
    data: data
  })
}

// 修改仓库管理调拔状态
export function updateStockchangestate(data) {
  return request({
    url: '/crm-store/stockchangestate',
    method: 'put',
    data: data
  })
}

// 删除仓库管理调拔状态
export function delStockchangestate(id) {
  return request({
    url: '/crm-store/stockchangestate/' + id,
    method: 'delete'
  })
}
