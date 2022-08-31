import request from '@/utils/request'

// 查询服务类型列表
export function listServicetype(query) {
  return request({
    url: '/crm-basicdata/servicetype/list',
    method: 'get',
    params: query
  })
}

// 查询服务类型详细
export function getServicetype(id) {
  return request({
    url: '/crm-basicdata/servicetype/' + id,
    method: 'get'
  })
}

// 新增服务类型
export function addServicetype(data) {
  return request({
    url: '/crm-basicdata/servicetype',
    method: 'post',
    data: data
  })
}

// 修改服务类型
export function updateServicetype(data) {
  return request({
    url: '/crm-basicdata/servicetype',
    method: 'put',
    data: data
  })
}

// 删除服务类型
export function delServicetype(id) {
  return request({
    url: '/crm-basicdata/servicetype/' + id,
    method: 'delete'
  })
}
