import request from '@/utils/request'

// 查询完成状态列表
export function listFinishstate(query) {
  return request({
    url: '/crm-buy/finishstate/list',
    method: 'get',
    params: query
  })
}

// 查询完成状态详细
export function getFinishstate(id) {
  return request({
    url: '/crm-buy/finishstate/' + id,
    method: 'get'
  })
}

// 新增完成状态
export function addFinishstate(data) {
  return request({
    url: '/crm-buy/finishstate',
    method: 'post',
    data: data
  })
}

// 修改完成状态
export function updateFinishstate(data) {
  return request({
    url: '/crm-buy/finishstate',
    method: 'put',
    data: data
  })
}

// 删除完成状态
export function delFinishstate(id) {
  return request({
    url: '/crm-buy/finishstate/' + id,
    method: 'delete'
  })
}
