import request from '@/utils/request'

// 查询呼叫人类型列表
export function listCallertype(query) {
  return request({
    url: '/crm-mytable/callertype/list',
    method: 'get',
    params: query
  })
}

// 查询呼叫人类型详细
export function getCallertype(id) {
  return request({
    url: '/crm-mytable/callertype/' + id,
    method: 'get'
  })
}

// 新增呼叫人类型
export function addCallertype(data) {
  return request({
    url: '/crm-mytable/callertype',
    method: 'post',
    data: data
  })
}

// 修改呼叫人类型
export function updateCallertype(data) {
  return request({
    url: '/crm-mytable/callertype',
    method: 'put',
    data: data
  })
}

// 删除呼叫人类型
export function delCallertype(id) {
  return request({
    url: '/crm-mytable/callertype/' + id,
    method: 'delete'
  })
}
