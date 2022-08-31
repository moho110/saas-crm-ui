import request from '@/utils/request'

// 查询汇款计划列表
export function listHuikuanplan(query) {
  return request({
    url: '/crm-buy/huikuanplan/list',
    method: 'get',
    params: query
  })
}

// 查询汇款计划详细
export function getHuikuanplan(id) {
  return request({
    url: '/crm-buy/huikuanplan/' + id,
    method: 'get'
  })
}

// 新增汇款计划
export function addHuikuanplan(data) {
  return request({
    url: '/crm-buy/huikuanplan',
    method: 'post',
    data: data
  })
}

// 修改汇款计划
export function updateHuikuanplan(data) {
  return request({
    url: '/crm-buy/huikuanplan',
    method: 'put',
    data: data
  })
}

// 删除汇款计划
export function delHuikuanplan(id) {
  return request({
    url: '/crm-buy/huikuanplan/' + id,
    method: 'delete'
  })
}
