import request from '@/utils/request'

// 查询采购单名细列表
export function listMingxi(query) {
  return request({
    url: '/crm-buy/mingxi/list',
    method: 'get',
    params: query
  })
}

// 查询采购单名细详细
export function getMingxi(id) {
  return request({
    url: '/crm-buy/mingxi/' + id,
    method: 'get'
  })
}

// 新增采购单名细
export function addMingxi(data) {
  return request({
    url: '/crm-buy/mingxi',
    method: 'post',
    data: data
  })
}

// 修改采购单名细
export function updateMingxi(data) {
  return request({
    url: '/crm-buy/mingxi',
    method: 'put',
    data: data
  })
}

// 删除采购单名细
export function delMingxi(id) {
  return request({
    url: '/crm-buy/mingxi/' + id,
    method: 'delete'
  })
}
