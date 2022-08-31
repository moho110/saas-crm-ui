import request from '@/utils/request'

// 查询工作计划列表
export function listWorkplanmain(query) {
  return request({
    url: '/crm-mytable/workplanmain/list',
    method: 'get',
    params: query
  })
}

// 查询工作计划详细
export function getWorkplanmain(id) {
  return request({
    url: '/crm-mytable/workplanmain/' + id,
    method: 'get'
  })
}

// 新增工作计划
export function addWorkplanmain(data) {
  return request({
    url: '/crm-mytable/workplanmain',
    method: 'post',
    data: data
  })
}

// 修改工作计划
export function updateWorkplanmain(data) {
  return request({
    url: '/crm-mytable/workplanmain',
    method: 'put',
    data: data
  })
}

// 删除工作计划
export function delWorkplanmain(id) {
  return request({
    url: '/crm-mytable/workplanmain/' + id,
    method: 'delete'
  })
}
