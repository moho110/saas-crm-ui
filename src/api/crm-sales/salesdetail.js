import request from '@/utils/request'

// 查询销售计划明细列表
export function listSalesdetail(query) {
  return request({
    url: '/crm-sales/salesdetail/list',
    method: 'get',
    params: query
  })
}

// 查询销售计划明细详细
export function getSalesdetail(id) {
  return request({
    url: '/crm-sales/salesdetail/' + id,
    method: 'get'
  })
}

// 新增销售计划明细
export function addSalesdetail(data) {
  return request({
    url: '/crm-sales/salesdetail',
    method: 'post',
    data: data
  })
}

// 修改销售计划明细
export function updateSalesdetail(data) {
  return request({
    url: '/crm-sales/salesdetail',
    method: 'put',
    data: data
  })
}

// 删除销售计划明细
export function delSalesdetail(id) {
  return request({
    url: '/crm-sales/salesdetail/' + id,
    method: 'delete'
  })
}
