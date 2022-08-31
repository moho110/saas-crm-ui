import request from '@/utils/request'

// 查询销售合同交付管理列表
export function listJiaofu(query) {
  return request({
    url: '/crm-sales/jiaofu/list',
    method: 'get',
    params: query
  })
}

// 查询销售合同交付管理详细
export function getJiaofu(id) {
  return request({
    url: '/crm-sales/jiaofu/' + id,
    method: 'get'
  })
}

// 新增销售合同交付管理
export function addJiaofu(data) {
  return request({
    url: '/crm-sales/jiaofu',
    method: 'post',
    data: data
  })
}

// 修改销售合同交付管理
export function updateJiaofu(data) {
  return request({
    url: '/crm-sales/jiaofu',
    method: 'put',
    data: data
  })
}

// 删除销售合同交付管理
export function delJiaofu(id) {
  return request({
    url: '/crm-sales/jiaofu/' + id,
    method: 'delete'
  })
}
