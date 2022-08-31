import request from '@/utils/request'

// 查询发货类型列表
export function listFahuotype(query) {
  return request({
    url: '/crm-sales/fahuotype/list',
    method: 'get',
    params: query
  })
}

// 查询发货类型详细
export function getFahuotype(id) {
  return request({
    url: '/crm-sales/fahuotype/' + id,
    method: 'get'
  })
}

// 新增发货类型
export function addFahuotype(data) {
  return request({
    url: '/crm-sales/fahuotype',
    method: 'post',
    data: data
  })
}

// 修改发货类型
export function updateFahuotype(data) {
  return request({
    url: '/crm-sales/fahuotype',
    method: 'put',
    data: data
  })
}

// 删除发货类型
export function delFahuotype(id) {
  return request({
    url: '/crm-sales/fahuotype/' + id,
    method: 'delete'
  })
}
