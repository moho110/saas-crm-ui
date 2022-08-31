import request from '@/utils/request'

// 查询采购计划列表
export function listBuyplanmain(query) {
  return request({
    url: '/crm-buy/buyplanmain/list',
    method: 'get',
    params: query
  })
}

// 查询采购计划详细
export function getBuyplanmain(id) {
  return request({
    url: '/crm-buy/buyplanmain/' + id,
    method: 'get'
  })
}

// 新增采购计划
export function addBuyplanmain(data) {
  return request({
    url: '/crm-buy/buyplanmain',
    method: 'post',
    data: data
  })
}

// 修改采购计划
export function updateBuyplanmain(data) {
  return request({
    url: '/crm-buy/buyplanmain',
    method: 'put',
    data: data
  })
}

// 删除采购计划
export function delBuyplanmain(id) {
  return request({
    url: '/crm-buy/buyplanmain/' + id,
    method: 'delete'
  })
}
