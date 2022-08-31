import request from '@/utils/request'

// 查询发货单列表
export function listFahuodan(query) {
  return request({
    url: '/crm-sales/fahuodan/list',
    method: 'get',
    params: query
  })
}

// 查询发货单详细
export function getFahuodan(id) {
  return request({
    url: '/crm-sales/fahuodan/' + id,
    method: 'get'
  })
}

// 新增发货单
export function addFahuodan(data) {
  return request({
    url: '/crm-sales/fahuodan',
    method: 'post',
    data: data
  })
}

// 修改发货单
export function updateFahuodan(data) {
  return request({
    url: '/crm-sales/fahuodan',
    method: 'put',
    data: data
  })
}

// 删除发货单
export function delFahuodan(id) {
  return request({
    url: '/crm-sales/fahuodan/' + id,
    method: 'delete'
  })
}
