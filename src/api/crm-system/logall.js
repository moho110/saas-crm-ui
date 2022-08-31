import request from '@/utils/request'

// 查询系统操作日志列表
export function listLogall(query) {
  return request({
    url: '/crm-system/logall/list',
    method: 'get',
    params: query
  })
}

// 查询系统操作日志详细
export function getLogall(id) {
  return request({
    url: '/crm-system/logall/' + id,
    method: 'get'
  })
}

// 新增系统操作日志
export function addLogall(data) {
  return request({
    url: '/crm-system/logall',
    method: 'post',
    data: data
  })
}

// 修改系统操作日志
export function updateLogall(data) {
  return request({
    url: '/crm-system/logall',
    method: 'put',
    data: data
  })
}

// 删除系统操作日志
export function delLogall(id) {
  return request({
    url: '/crm-system/logall/' + id,
    method: 'delete'
  })
}
