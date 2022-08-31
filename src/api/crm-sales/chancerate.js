import request from '@/utils/request'

// 查询销售机会成功率列表
export function listChancerate(query) {
  return request({
    url: '/crm-sales/chancerate/list',
    method: 'get',
    params: query
  })
}

// 查询销售机会成功率详细
export function getChancerate(id) {
  return request({
    url: '/crm-sales/chancerate/' + id,
    method: 'get'
  })
}

// 新增销售机会成功率
export function addChancerate(data) {
  return request({
    url: '/crm-sales/chancerate',
    method: 'post',
    data: data
  })
}

// 修改销售机会成功率
export function updateChancerate(data) {
  return request({
    url: '/crm-sales/chancerate',
    method: 'put',
    data: data
  })
}

// 删除销售机会成功率
export function delChancerate(id) {
  return request({
    url: '/crm-sales/chancerate/' + id,
    method: 'delete'
  })
}
