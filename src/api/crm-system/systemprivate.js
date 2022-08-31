import request from '@/utils/request'

// 查询系统权限列表
export function listSystemprivate(query) {
  return request({
    url: '/crm-system/systemprivate/list',
    method: 'get',
    params: query
  })
}

// 查询系统权限详细
export function getSystemprivate(id) {
  return request({
    url: '/crm-system/systemprivate/' + id,
    method: 'get'
  })
}

// 新增系统权限
export function addSystemprivate(data) {
  return request({
    url: '/crm-system/systemprivate',
    method: 'post',
    data: data
  })
}

// 修改系统权限
export function updateSystemprivate(data) {
  return request({
    url: '/crm-system/systemprivate',
    method: 'put',
    data: data
  })
}

// 删除系统权限
export function delSystemprivate(id) {
  return request({
    url: '/crm-system/systemprivate/' + id,
    method: 'delete'
  })
}
