import request from '@/utils/request'

// 查询系统日志类型列表
export function listLogtype(query) {
  return request({
    url: '/crm-system/logtype/list',
    method: 'get',
    params: query
  })
}

// 查询系统日志类型详细
export function getLogtype(id) {
  return request({
    url: '/crm-system/logtype/' + id,
    method: 'get'
  })
}

// 新增系统日志类型
export function addLogtype(data) {
  return request({
    url: '/crm-system/logtype',
    method: 'post',
    data: data
  })
}

// 修改系统日志类型
export function updateLogtype(data) {
  return request({
    url: '/crm-system/logtype',
    method: 'put',
    data: data
  })
}

// 删除系统日志类型
export function delLogtype(id) {
  return request({
    url: '/crm-system/logtype/' + id,
    method: 'delete'
  })
}
