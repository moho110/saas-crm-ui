import request from '@/utils/request'

// 查询采购计划明细表颜色列表
export function listColor(query) {
  return request({
    url: '/crm-buy/color/list',
    method: 'get',
    params: query
  })
}

// 查询采购计划明细表颜色详细
export function getColor(id) {
  return request({
    url: '/crm-buy/color/' + id,
    method: 'get'
  })
}

// 新增采购计划明细表颜色
export function addColor(data) {
  return request({
    url: '/crm-buy/color',
    method: 'post',
    data: data
  })
}

// 修改采购计划明细表颜色
export function updateColor(data) {
  return request({
    url: '/crm-buy/color',
    method: 'put',
    data: data
  })
}

// 删除采购计划明细表颜色
export function delColor(id) {
  return request({
    url: '/crm-buy/color/' + id,
    method: 'delete'
  })
}
