import request from '@/utils/request'

// 查询销售计划明细表颜色列表
export function listScolor(query) {
  return request({
    url: '/crm-sales/scolor/list',
    method: 'get',
    params: query
  })
}

// 查询销售计划明细表颜色详细
export function getScolor(id) {
  return request({
    url: '/crm-sales/scolor/' + id,
    method: 'get'
  })
}

// 新增销售计划明细表颜色
export function addScolor(data) {
  return request({
    url: '/crm-sales/scolor',
    method: 'post',
    data: data
  })
}

// 修改销售计划明细表颜色
export function updateScolor(data) {
  return request({
    url: '/crm-sales/scolor',
    method: 'put',
    data: data
  })
}

// 删除销售计划明细表颜色
export function delScolor(id) {
  return request({
    url: '/crm-sales/scolor/' + id,
    method: 'delete'
  })
}
