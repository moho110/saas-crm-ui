import request from '@/utils/request'

// 查询采购计划状态列表
export function listBuyplanstate(query) {
  return request({
    url: '/crm-buy/buyplanstate/list',
    method: 'get',
    params: query
  })
}

// 查询采购计划状态详细
export function getBuyplanstate(id) {
  return request({
    url: '/crm-buy/buyplanstate/' + id,
    method: 'get'
  })
}

// 新增采购计划状态
export function addBuyplanstate(data) {
  return request({
    url: '/crm-buy/buyplanstate',
    method: 'post',
    data: data
  })
}

// 修改采购计划状态
export function updateBuyplanstate(data) {
  return request({
    url: '/crm-buy/buyplanstate',
    method: 'put',
    data: data
  })
}

// 删除采购计划状态
export function delBuyplanstate(id) {
  return request({
    url: '/crm-buy/buyplanstate/' + id,
    method: 'delete'
  })
}
