import request from '@/utils/request'

// 查询同意与否列表
export function listHrboolean(query) {
  return request({
    url: '/crm-hr/hrboolean/list',
    method: 'get',
    params: query
  })
}

// 查询同意与否详细
export function getHrboolean(id) {
  return request({
    url: '/crm-hr/hrboolean/' + id,
    method: 'get'
  })
}

// 新增同意与否
export function addHrboolean(data) {
  return request({
    url: '/crm-hr/hrboolean',
    method: 'post',
    data: data
  })
}

// 修改同意与否
export function updateHrboolean(data) {
  return request({
    url: '/crm-hr/hrboolean',
    method: 'put',
    data: data
  })
}

// 删除同意与否
export function delHrboolean(id) {
  return request({
    url: '/crm-hr/hrboolean/' + id,
    method: 'delete'
  })
}
