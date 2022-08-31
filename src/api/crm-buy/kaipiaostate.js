import request from '@/utils/request'

// 查询开票状态列表
export function listKaipiaostate(query) {
  return request({
    url: '/crm-buy/kaipiaostate/list',
    method: 'get',
    params: query
  })
}

// 查询开票状态详细
export function getKaipiaostate(id) {
  return request({
    url: '/crm-buy/kaipiaostate/' + id,
    method: 'get'
  })
}

// 新增开票状态
export function addKaipiaostate(data) {
  return request({
    url: '/crm-buy/kaipiaostate',
    method: 'post',
    data: data
  })
}

// 修改开票状态
export function updateKaipiaostate(data) {
  return request({
    url: '/crm-buy/kaipiaostate',
    method: 'put',
    data: data
  })
}

// 删除开票状态
export function delKaipiaostate(id) {
  return request({
    url: '/crm-buy/kaipiaostate/' + id,
    method: 'delete'
  })
}
