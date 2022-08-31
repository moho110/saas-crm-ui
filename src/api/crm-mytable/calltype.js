import request from '@/utils/request'

// 查询来电类型列表
export function listCalltype(query) {
  return request({
    url: '/crm-mytable/calltype/list',
    method: 'get',
    params: query
  })
}

// 查询来电类型详细
export function getCalltype(id) {
  return request({
    url: '/crm-mytable/calltype/' + id,
    method: 'get'
  })
}

// 新增来电类型
export function addCalltype(data) {
  return request({
    url: '/crm-mytable/calltype',
    method: 'post',
    data: data
  })
}

// 修改来电类型
export function updateCalltype(data) {
  return request({
    url: '/crm-mytable/calltype',
    method: 'put',
    data: data
  })
}

// 删除来电类型
export function delCalltype(id) {
  return request({
    url: '/crm-mytable/calltype/' + id,
    method: 'delete'
  })
}
