import request from '@/utils/request'

// 查询系统配置列表
export function listSystemconfig(query) {
  return request({
    url: '/crm-system/systemconfig/list',
    method: 'get',
    params: query
  })
}

// 查询系统配置详细
export function getSystemconfig(id) {
  return request({
    url: '/crm-system/systemconfig/' + id,
    method: 'get'
  })
}

// 新增系统配置
export function addSystemconfig(data) {
  return request({
    url: '/crm-system/systemconfig',
    method: 'post',
    data: data
  })
}

// 修改系统配置
export function updateSystemconfig(data) {
  return request({
    url: '/crm-system/systemconfig',
    method: 'put',
    data: data
  })
}

// 删除系统配置
export function delSystemconfig(id) {
  return request({
    url: '/crm-system/systemconfig/' + id,
    method: 'delete'
  })
}
