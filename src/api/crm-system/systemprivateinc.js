import request from '@/utils/request'

// 查询系统权限配置列表
export function listSystemprivateinc(query) {
  return request({
    url: '/crm-system/systemprivateinc/list',
    method: 'get',
    params: query
  })
}

// 查询系统权限配置详细
export function getSystemprivateinc(id) {
  return request({
    url: '/crm-system/systemprivateinc/' + id,
    method: 'get'
  })
}

// 新增系统权限配置
export function addSystemprivateinc(data) {
  return request({
    url: '/crm-system/systemprivateinc',
    method: 'post',
    data: data
  })
}

// 修改系统权限配置
export function updateSystemprivateinc(data) {
  return request({
    url: '/crm-system/systemprivateinc',
    method: 'put',
    data: data
  })
}

// 删除系统权限配置
export function delSystemprivateinc(id) {
  return request({
    url: '/crm-system/systemprivateinc/' + id,
    method: 'delete'
  })
}
