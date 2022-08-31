import request from '@/utils/request'

// 查询工作人员工作经验列表
export function listWorkexperience(query) {
  return request({
    url: '/crm-hr/workexperience/list',
    method: 'get',
    params: query
  })
}

// 查询工作人员工作经验详细
export function getWorkexperience(id) {
  return request({
    url: '/crm-hr/workexperience/' + id,
    method: 'get'
  })
}

// 新增工作人员工作经验
export function addWorkexperience(data) {
  return request({
    url: '/crm-hr/workexperience',
    method: 'post',
    data: data
  })
}

// 修改工作人员工作经验
export function updateWorkexperience(data) {
  return request({
    url: '/crm-hr/workexperience',
    method: 'put',
    data: data
  })
}

// 删除工作人员工作经验
export function delWorkexperience(id) {
  return request({
    url: '/crm-hr/workexperience/' + id,
    method: 'delete'
  })
}
