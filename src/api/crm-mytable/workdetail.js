import request from '@/utils/request'

// 查询工作计划明细列表
export function listWorkdetail(query) {
  return request({
    url: '/crm-mytable/workdetail/list',
    method: 'get',
    params: query
  })
}

// 查询工作计划明细详细
export function getWorkdetail(id) {
  return request({
    url: '/crm-mytable/workdetail/' + id,
    method: 'get'
  })
}

// 新增工作计划明细
export function addWorkdetail(data) {
  return request({
    url: '/crm-mytable/workdetail',
    method: 'post',
    data: data
  })
}

// 修改工作计划明细
export function updateWorkdetail(data) {
  return request({
    url: '/crm-mytable/workdetail',
    method: 'put',
    data: data
  })
}

// 删除工作计划明细
export function delWorkdetail(id) {
  return request({
    url: '/crm-mytable/workdetail/' + id,
    method: 'delete'
  })
}
