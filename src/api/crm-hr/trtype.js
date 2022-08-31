import request from '@/utils/request'

// 查询转职类型列表
export function listTrtype(query) {
  return request({
    url: '/crm-hr/trtype/list',
    method: 'get',
    params: query
  })
}

// 查询转职类型详细
export function getTrtype(id) {
  return request({
    url: '/crm-hr/trtype/' + id,
    method: 'get'
  })
}

// 新增转职类型
export function addTrtype(data) {
  return request({
    url: '/crm-hr/trtype',
    method: 'post',
    data: data
  })
}

// 修改转职类型
export function updateTrtype(data) {
  return request({
    url: '/crm-hr/trtype',
    method: 'put',
    data: data
  })
}

// 删除转职类型
export function delTrtype(id) {
  return request({
    url: '/crm-hr/trtype/' + id,
    method: 'delete'
  })
}
