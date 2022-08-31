import request from '@/utils/request'

// 查询奖惩名称列表
export function listName(query) {
  return request({
    url: '/crm-hr/name/list',
    method: 'get',
    params: query
  })
}

// 查询奖惩名称详细
export function getName(id) {
  return request({
    url: '/crm-hr/name/' + id,
    method: 'get'
  })
}

// 新增奖惩名称
export function addName(data) {
  return request({
    url: '/crm-hr/name',
    method: 'post',
    data: data
  })
}

// 修改奖惩名称
export function updateName(data) {
  return request({
    url: '/crm-hr/name',
    method: 'put',
    data: data
  })
}

// 删除奖惩名称
export function delName(id) {
  return request({
    url: '/crm-hr/name/' + id,
    method: 'delete'
  })
}
