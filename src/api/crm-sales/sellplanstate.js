import request from '@/utils/request'

// 查询销售计划状态列表
export function listSellplanstate(query) {
  return request({
    url: '/crm-sales/sellplanstate/list',
    method: 'get',
    params: query
  })
}

// 查询销售计划状态详细
export function getSellplanstate(id) {
  return request({
    url: '/crm-sales/sellplanstate/' + id,
    method: 'get'
  })
}

// 新增销售计划状态
export function addSellplanstate(data) {
  return request({
    url: '/crm-sales/sellplanstate',
    method: 'post',
    data: data
  })
}

// 修改销售计划状态
export function updateSellplanstate(data) {
  return request({
    url: '/crm-sales/sellplanstate',
    method: 'put',
    data: data
  })
}

// 删除销售计划状态
export function delSellplanstate(id) {
  return request({
    url: '/crm-sales/sellplanstate/' + id,
    method: 'delete'
  })
}
