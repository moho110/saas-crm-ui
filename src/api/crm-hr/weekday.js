import request from '@/utils/request'

// 查询周工作日列表
export function listWeekday(query) {
  return request({
    url: '/crm-hr/weekday/list',
    method: 'get',
    params: query
  })
}

// 查询周工作日详细
export function getWeekday(id) {
  return request({
    url: '/crm-hr/weekday/' + id,
    method: 'get'
  })
}

// 新增周工作日
export function addWeekday(data) {
  return request({
    url: '/crm-hr/weekday',
    method: 'post',
    data: data
  })
}

// 修改周工作日
export function updateWeekday(data) {
  return request({
    url: '/crm-hr/weekday',
    method: 'put',
    data: data
  })
}

// 删除周工作日
export function delWeekday(id) {
  return request({
    url: '/crm-hr/weekday/' + id,
    method: 'delete'
  })
}
