import request from '@/utils/request'

// 查询帐户操作类型列表
export function listAccesstype(query) {
  return request({
    url: '/crm-finance/accesstype/list',
    method: 'get',
    params: query
  })
}

// 查询帐户操作类型详细
export function getAccesstype(id) {
  return request({
    url: '/crm-finance/accesstype/' + id,
    method: 'get'
  })
}

// 新增帐户操作类型
export function addAccesstype(data) {
  return request({
    url: '/crm-finance/accesstype',
    method: 'post',
    data: data
  })
}

// 修改帐户操作类型
export function updateAccesstype(data) {
  return request({
    url: '/crm-finance/accesstype',
    method: 'put',
    data: data
  })
}

// 删除帐户操作类型
export function delAccesstype(id) {
  return request({
    url: '/crm-finance/accesstype/' + id,
    method: 'delete'
  })
}
