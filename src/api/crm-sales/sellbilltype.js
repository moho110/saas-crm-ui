import request from '@/utils/request'

// 查询销售清单类型列表
export function listSellbilltype(query) {
  return request({
    url: '/crm-sales/sellbilltype/list',
    method: 'get',
    params: query
  })
}

// 查询销售清单类型详细
export function getSellbilltype(id) {
  return request({
    url: '/crm-sales/sellbilltype/' + id,
    method: 'get'
  })
}

// 新增销售清单类型
export function addSellbilltype(data) {
  return request({
    url: '/crm-sales/sellbilltype',
    method: 'post',
    data: data
  })
}

// 修改销售清单类型
export function updateSellbilltype(data) {
  return request({
    url: '/crm-sales/sellbilltype',
    method: 'put',
    data: data
  })
}

// 删除销售清单类型
export function delSellbilltype(id) {
  return request({
    url: '/crm-sales/sellbilltype/' + id,
    method: 'delete'
  })
}
