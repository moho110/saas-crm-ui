import request from '@/utils/request'

// 查询付款计划列表
export function listFukuanplan(query) {
  return request({
    url: '/crm-sales/fukuanplan/list',
    method: 'get',
    params: query
  })
}

// 查询付款计划详细
export function getFukuanplan(id) {
  return request({
    url: '/crm-sales/fukuanplan/' + id,
    method: 'get'
  })
}

// 新增付款计划
export function addFukuanplan(data) {
  return request({
    url: '/crm-sales/fukuanplan',
    method: 'post',
    data: data
  })
}

// 修改付款计划
export function updateFukuanplan(data) {
  return request({
    url: '/crm-sales/fukuanplan',
    method: 'put',
    data: data
  })
}

// 删除付款计划
export function delFukuanplan(id) {
  return request({
    url: '/crm-sales/fukuanplan/' + id,
    method: 'delete'
  })
}
