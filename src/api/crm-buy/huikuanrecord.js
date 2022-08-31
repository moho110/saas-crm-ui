import request from '@/utils/request'

// 查询汇款记录列表
export function listHuikuanrecord(query) {
  return request({
    url: '/crm-buy/huikuanrecord/list',
    method: 'get',
    params: query
  })
}

// 查询汇款记录详细
export function getHuikuanrecord(id) {
  return request({
    url: '/crm-buy/huikuanrecord/' + id,
    method: 'get'
  })
}

// 新增汇款记录
export function addHuikuanrecord(data) {
  return request({
    url: '/crm-buy/huikuanrecord',
    method: 'post',
    data: data
  })
}

// 修改汇款记录
export function updateHuikuanrecord(data) {
  return request({
    url: '/crm-buy/huikuanrecord',
    method: 'put',
    data: data
  })
}

// 删除汇款记录
export function delHuikuanrecord(id) {
  return request({
    url: '/crm-buy/huikuanrecord/' + id,
    method: 'delete'
  })
}
