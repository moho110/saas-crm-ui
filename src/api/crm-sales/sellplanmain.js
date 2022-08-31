import request from '@/utils/request'

// 查询销售计划列表
export function listSellplanmain(query) {
  return request({
    url: '/crm-sales/sellplanmain/list',
    method: 'get',
    params: query
  })
}

// 查询销售计划详细
export function getSellplanmain(id) {
  return request({
    url: '/crm-sales/sellplanmain/' + id,
    method: 'get'
  })
}

// 新增销售计划
export function addSellplanmain(data) {
  return request({
    url: '/crm-sales/sellplanmain',
    method: 'post',
    data: data
  })
}

// 修改销售计划
export function updateSellplanmain(data) {
  return request({
    url: '/crm-sales/sellplanmain',
    method: 'put',
    data: data
  })
}

// 删除销售计划
export function delSellplanmain(id) {
  return request({
    url: '/crm-sales/sellplanmain/' + id,
    method: 'delete'
  })
}
