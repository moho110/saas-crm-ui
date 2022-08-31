import request from '@/utils/request'

// 查询工作计划审核列表
export function listWorkplanshenhe(query) {
  return request({
    url: '/crm-mytable/workplanshenhe/list',
    method: 'get',
    params: query
  })
}

// 查询工作计划审核详细
export function getWorkplanshenhe(id) {
  return request({
    url: '/crm-mytable/workplanshenhe/' + id,
    method: 'get'
  })
}

// 新增工作计划审核
export function addWorkplanshenhe(data) {
  return request({
    url: '/crm-mytable/workplanshenhe',
    method: 'post',
    data: data
  })
}

// 修改工作计划审核
export function updateWorkplanshenhe(data) {
  return request({
    url: '/crm-mytable/workplanshenhe',
    method: 'put',
    data: data
  })
}

// 删除工作计划审核
export function delWorkplanshenhe(id) {
  return request({
    url: '/crm-mytable/workplanshenhe/' + id,
    method: 'delete'
  })
}
