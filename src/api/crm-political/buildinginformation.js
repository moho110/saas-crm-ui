import request from '@/utils/request'

// 查询房产信息列表
export function listBuildinginformation(query) {
  return request({
    url: '/crm-political/buildinginformation/list',
    method: 'get',
    params: query
  })
}

// 查询房产信息详细
export function getBuildinginformation(id) {
  return request({
    url: '/crm-political/buildinginformation/' + id,
    method: 'get'
  })
}

// 新增房产信息
export function addBuildinginformation(data) {
  return request({
    url: '/crm-political/buildinginformation',
    method: 'post',
    data: data
  })
}

// 修改房产信息
export function updateBuildinginformation(data) {
  return request({
    url: '/crm-political/buildinginformation',
    method: 'put',
    data: data
  })
}

// 删除房产信息
export function delBuildinginformation(id) {
  return request({
    url: '/crm-political/buildinginformation/' + id,
    method: 'delete'
  })
}
