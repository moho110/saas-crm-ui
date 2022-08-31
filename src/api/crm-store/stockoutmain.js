import request from '@/utils/request'

// 查询仓库出库列表
export function listStockoutmain(query) {
  return request({
    url: '/crm-store/stockoutmain/list',
    method: 'get',
    params: query
  })
}

// 查询仓库出库详细
export function getStockoutmain(id) {
  return request({
    url: '/crm-store/stockoutmain/' + id,
    method: 'get'
  })
}

// 新增仓库出库
export function addStockoutmain(data) {
  return request({
    url: '/crm-store/stockoutmain',
    method: 'post',
    data: data
  })
}

// 修改仓库出库
export function updateStockoutmain(data) {
  return request({
    url: '/crm-store/stockoutmain',
    method: 'put',
    data: data
  })
}

// 删除仓库出库
export function delStockoutmain(id) {
  return request({
    url: '/crm-store/stockoutmain/' + id,
    method: 'delete'
  })
}
