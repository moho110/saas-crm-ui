import request from '@/utils/request'

// 查询销售模式列表
export function listSalemode(query) {
  return request({
    url: '/crm-sales/salemode/list',
    method: 'get',
    params: query
  })
}

// 查询销售模式详细
export function getSalemode(id) {
  return request({
    url: '/crm-sales/salemode/' + id,
    method: 'get'
  })
}

// 新增销售模式
export function addSalemode(data) {
  return request({
    url: '/crm-sales/salemode',
    method: 'post',
    data: data
  })
}

// 修改销售模式
export function updateSalemode(data) {
  return request({
    url: '/crm-sales/salemode',
    method: 'put',
    data: data
  })
}

// 删除销售模式
export function delSalemode(id) {
  return request({
    url: '/crm-sales/salemode/' + id,
    method: 'delete'
  })
}
