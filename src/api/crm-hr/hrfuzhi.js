import request from '@/utils/request'

// 查询人员复职列表
export function listHrfuzhi(query) {
  return request({
    url: '/crm-hr/hrfuzhi/list',
    method: 'get',
    params: query
  })
}

// 查询人员复职详细
export function getHrfuzhi(id) {
  return request({
    url: '/crm-hr/hrfuzhi/' + id,
    method: 'get'
  })
}

// 新增人员复职
export function addHrfuzhi(data) {
  return request({
    url: '/crm-hr/hrfuzhi',
    method: 'post',
    data: data
  })
}

// 修改人员复职
export function updateHrfuzhi(data) {
  return request({
    url: '/crm-hr/hrfuzhi',
    method: 'put',
    data: data
  })
}

// 删除人员复职
export function delHrfuzhi(id) {
  return request({
    url: '/crm-hr/hrfuzhi/' + id,
    method: 'delete'
  })
}
