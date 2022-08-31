import request from '@/utils/request'

// 查询服务来源列表
export function listServicesource(query) {
  return request({
    url: '/crm-basicdata/servicesource/list',
    method: 'get',
    params: query
  })
}

// 查询服务来源详细
export function getServicesource(id) {
  return request({
    url: '/crm-basicdata/servicesource/' + id,
    method: 'get'
  })
}

// 新增服务来源
export function addServicesource(data) {
  return request({
    url: '/crm-basicdata/servicesource',
    method: 'post',
    data: data
  })
}

// 修改服务来源
export function updateServicesource(data) {
  return request({
    url: '/crm-basicdata/servicesource',
    method: 'put',
    data: data
  })
}

// 删除服务来源
export function delServicesource(id) {
  return request({
    url: '/crm-basicdata/servicesource/' + id,
    method: 'delete'
  })
}
