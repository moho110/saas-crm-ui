import request from '@/utils/request'

// 查询开票记录列表
export function listKaipiaorecord(query) {
  return request({
    url: '/crm-buy/kaipiaorecord/list',
    method: 'get',
    params: query
  })
}

// 查询开票记录详细
export function getKaipiaorecord(id) {
  return request({
    url: '/crm-buy/kaipiaorecord/' + id,
    method: 'get'
  })
}

// 新增开票记录
export function addKaipiaorecord(data) {
  return request({
    url: '/crm-buy/kaipiaorecord',
    method: 'post',
    data: data
  })
}

// 修改开票记录
export function updateKaipiaorecord(data) {
  return request({
    url: '/crm-buy/kaipiaorecord',
    method: 'put',
    data: data
  })
}

// 删除开票记录
export function delKaipiaorecord(id) {
  return request({
    url: '/crm-buy/kaipiaorecord/' + id,
    method: 'delete'
  })
}
