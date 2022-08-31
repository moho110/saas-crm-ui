import request from '@/utils/request'

// 查询工作人员状态列表
export function listStatus(query) {
  return request({
    url: '/crm-hr/status/list',
    method: 'get',
    params: query
  })
}

// 查询工作人员状态详细
export function getStatus(id) {
  return request({
    url: '/crm-hr/status/' + id,
    method: 'get'
  })
}

// 新增工作人员状态
export function addStatus(data) {
  return request({
    url: '/crm-hr/status',
    method: 'post',
    data: data
  })
}

// 修改工作人员状态
export function updateStatus(data) {
  return request({
    url: '/crm-hr/status',
    method: 'put',
    data: data
  })
}

// 删除工作人员状态
export function delStatus(id) {
  return request({
    url: '/crm-hr/status/' + id,
    method: 'delete'
  })
}
