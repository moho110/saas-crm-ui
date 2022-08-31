import request from '@/utils/request'

// 查询人员录用列表
export function listLuyong(query) {
  return request({
    url: '/crm-hr/luyong/list',
    method: 'get',
    params: query
  })
}

// 查询人员录用详细
export function getLuyong(id) {
  return request({
    url: '/crm-hr/luyong/' + id,
    method: 'get'
  })
}

// 新增人员录用
export function addLuyong(data) {
  return request({
    url: '/crm-hr/luyong',
    method: 'post',
    data: data
  })
}

// 修改人员录用
export function updateLuyong(data) {
  return request({
    url: '/crm-hr/luyong',
    method: 'put',
    data: data
  })
}

// 删除人员录用
export function delLuyong(id) {
  return request({
    url: '/crm-hr/luyong/' + id,
    method: 'delete'
  })
}
