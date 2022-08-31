import request from '@/utils/request'

// 查询服务状态列表
export function listServicestatus(query) {
  return request({
    url: '/crm-basicdata/servicestatus/list',
    method: 'get',
    params: query
  })
}

// 查询服务状态详细
export function getServicestatus(id) {
  return request({
    url: '/crm-basicdata/servicestatus/' + id,
    method: 'get'
  })
}

// 新增服务状态
export function addServicestatus(data) {
  return request({
    url: '/crm-basicdata/servicestatus',
    method: 'post',
    data: data
  })
}

// 修改服务状态
export function updateServicestatus(data) {
  return request({
    url: '/crm-basicdata/servicestatus',
    method: 'put',
    data: data
  })
}

// 删除服务状态
export function delServicestatus(id) {
  return request({
    url: '/crm-basicdata/servicestatus/' + id,
    method: 'delete'
  })
}
