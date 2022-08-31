import request from '@/utils/request'

// 查询收票记录列表
export function listShoupiaorecord(query) {
  return request({
    url: '/crm-sales/shoupiaorecord/list',
    method: 'get',
    params: query
  })
}

// 查询收票记录详细
export function getShoupiaorecord(id) {
  return request({
    url: '/crm-sales/shoupiaorecord/' + id,
    method: 'get'
  })
}

// 新增收票记录
export function addShoupiaorecord(data) {
  return request({
    url: '/crm-sales/shoupiaorecord',
    method: 'post',
    data: data
  })
}

// 修改收票记录
export function updateShoupiaorecord(data) {
  return request({
    url: '/crm-sales/shoupiaorecord',
    method: 'put',
    data: data
  })
}

// 删除收票记录
export function delShoupiaorecord(id) {
  return request({
    url: '/crm-sales/shoupiaorecord/' + id,
    method: 'delete'
  })
}
