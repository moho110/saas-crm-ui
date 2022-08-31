import request from '@/utils/request'

// 查询采购单名细列表
export function listDetail(query) {
  return request({
    url: '/crm-buy/detail/list',
    method: 'get',
    params: query
  })
}

// 查询采购单名细详细
export function getDetail(id) {
  return request({
    url: '/crm-buy/detail/' + id,
    method: 'get'
  })
}

// 新增采购单名细
export function addDetail(data) {
  return request({
    url: '/crm-buy/detail',
    method: 'post',
    data: data
  })
}

// 修改采购单名细
export function updateDetail(data) {
  return request({
    url: '/crm-buy/detail',
    method: 'put',
    data: data
  })
}

// 删除采购单名细
export function delDetail(id) {
  return request({
    url: '/crm-buy/detail/' + id,
    method: 'delete'
  })
}
