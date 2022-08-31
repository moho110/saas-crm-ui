import request from '@/utils/request'

// 查询人员奖惩列表
export function listPunishment(query) {
  return request({
    url: '/crm-hr/punishment/list',
    method: 'get',
    params: query
  })
}

// 查询人员奖惩详细
export function getPunishment(id) {
  return request({
    url: '/crm-hr/punishment/' + id,
    method: 'get'
  })
}

// 新增人员奖惩
export function addPunishment(data) {
  return request({
    url: '/crm-hr/punishment',
    method: 'post',
    data: data
  })
}

// 修改人员奖惩
export function updatePunishment(data) {
  return request({
    url: '/crm-hr/punishment',
    method: 'put',
    data: data
  })
}

// 删除人员奖惩
export function delPunishment(id) {
  return request({
    url: '/crm-hr/punishment/' + id,
    method: 'delete'
  })
}
