import request from '@/utils/request'

// 查询销售机会列表
export function listChance(query) {
  return request({
    url: '/crm-sales/chance/list',
    method: 'get',
    params: query
  })
}

// 查询销售机会详细
export function getChance(id) {
  return request({
    url: '/crm-sales/chance/' + id,
    method: 'get'
  })
}

// 新增销售机会
export function addChance(data) {
  return request({
    url: '/crm-sales/chance',
    method: 'post',
    data: data
  })
}

// 修改销售机会
export function updateChance(data) {
  return request({
    url: '/crm-sales/chance',
    method: 'put',
    data: data
  })
}

// 删除销售机会
export function delChance(id) {
  return request({
    url: '/crm-sales/chance/' + id,
    method: 'delete'
  })
}
