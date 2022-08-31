import request from '@/utils/request'

// 查询是否奖惩列表
export function listP(query) {
  return request({
    url: '/crm-hr/p/list',
    method: 'get',
    params: query
  })
}

// 查询是否奖惩详细
export function getP(id) {
  return request({
    url: '/crm-hr/p/' + id,
    method: 'get'
  })
}

// 新增是否奖惩
export function addP(data) {
  return request({
    url: '/crm-hr/p',
    method: 'post',
    data: data
  })
}

// 修改是否奖惩
export function updateP(data) {
  return request({
    url: '/crm-hr/p',
    method: 'put',
    data: data
  })
}

// 删除是否奖惩
export function delP(id) {
  return request({
    url: '/crm-hr/p/' + id,
    method: 'delete'
  })
}
