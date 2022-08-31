import request from '@/utils/request'

// 查询部门管理列表
export function listDepartment(query) {
  return request({
    url: '/crm-basicdata/department/list',
    method: 'get',
    params: query
  })
}

// 查询部门管理详细
export function getDepartment(id) {
  return request({
    url: '/crm-basicdata/department/' + id,
    method: 'get'
  })
}

// 新增部门管理
export function addDepartment(data) {
  return request({
    url: '/crm-basicdata/department',
    method: 'post',
    data: data
  })
}

// 修改部门管理
export function updateDepartment(data) {
  return request({
    url: '/crm-basicdata/department',
    method: 'put',
    data: data
  })
}

// 删除部门管理
export function delDepartment(id) {
  return request({
    url: '/crm-basicdata/department/' + id,
    method: 'delete'
  })
}
