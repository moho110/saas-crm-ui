import request from '@/utils/request'

// 查询系统权限配置列表
export function listSystemprivateconfig(query) {
  return request({
    url: '/crm-system/systemprivateconfig/list',
    method: 'get',
    params: query
  })
}

// 查询系统权限配置详细
export function getSystemprivateconfig(id) {
  return request({
    url: '/crm-system/systemprivateconfig/' + id,
    method: 'get'
  })
}

// 新增系统权限配置
export function addSystemprivateconfig(data) {
  return request({
    url: '/crm-system/systemprivateconfig',
    method: 'post',
    data: data
  })
}

// 修改系统权限配置
export function updateSystemprivateconfig(data) {
  return request({
    url: '/crm-system/systemprivateconfig',
    method: 'put',
    data: data
  })
}

// 删除系统权限配置
export function delSystemprivateconfig(id) {
  return request({
    url: '/crm-system/systemprivateconfig/' + id,
    method: 'delete'
  })
}
