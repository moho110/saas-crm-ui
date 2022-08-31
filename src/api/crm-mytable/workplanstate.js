import request from '@/utils/request'

// 查询工作计划状态列表
export function listWorkplanstate(query) {
  return request({
    url: '/crm-mytable/workplanstate/list',
    method: 'get',
    params: query
  })
}

// 查询工作计划状态详细
export function getWorkplanstate(id) {
  return request({
    url: '/crm-mytable/workplanstate/' + id,
    method: 'get'
  })
}

// 新增工作计划状态
export function addWorkplanstate(data) {
  return request({
    url: '/crm-mytable/workplanstate',
    method: 'post',
    data: data
  })
}

// 修改工作计划状态
export function updateWorkplanstate(data) {
  return request({
    url: '/crm-mytable/workplanstate',
    method: 'put',
    data: data
  })
}

// 删除工作计划状态
export function delWorkplanstate(id) {
  return request({
    url: '/crm-mytable/workplanstate/' + id,
    method: 'delete'
  })
}
