import request from '@/utils/request'

// 查询帐号操作列表
export function listAccessbank(query) {
  return request({
    url: '/crm-finance/accessbank/list',
    method: 'get',
    params: query
  })
}

// 查询帐号操作详细
export function getAccessbank(id) {
  return request({
    url: '/crm-finance/accessbank/' + id,
    method: 'get'
  })
}

// 新增帐号操作
export function addAccessbank(data) {
  return request({
    url: '/crm-finance/accessbank',
    method: 'post',
    data: data
  })
}

// 修改帐号操作
export function updateAccessbank(data) {
  return request({
    url: '/crm-finance/accessbank',
    method: 'put',
    data: data
  })
}

// 删除帐号操作
export function delAccessbank(id) {
  return request({
    url: '/crm-finance/accessbank/' + id,
    method: 'delete'
  })
}
