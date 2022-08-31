import request from '@/utils/request'

// 查询行业归属列表
export function listProperty(query) {
  return request({
    url: '/crm-basicdata/property/list',
    method: 'get',
    params: query
  })
}

// 查询行业归属详细
export function getProperty(id) {
  return request({
    url: '/crm-basicdata/property/' + id,
    method: 'get'
  })
}

// 新增行业归属
export function addProperty(data) {
  return request({
    url: '/crm-basicdata/property',
    method: 'post',
    data: data
  })
}

// 修改行业归属
export function updateProperty(data) {
  return request({
    url: '/crm-basicdata/property',
    method: 'put',
    data: data
  })
}

// 删除行业归属
export function delProperty(id) {
  return request({
    url: '/crm-basicdata/property/' + id,
    method: 'delete'
  })
}
