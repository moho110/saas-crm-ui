import request from '@/utils/request'

// 查询日程安排列表
export function listCalendar(query) {
  return request({
    url: '/crm-mytable/calendar/list',
    method: 'get',
    params: query
  })
}

// 查询日程安排详细
export function getCalendar(id) {
  return request({
    url: '/crm-mytable/calendar/' + id,
    method: 'get'
  })
}

// 新增日程安排
export function addCalendar(data) {
  return request({
    url: '/crm-mytable/calendar',
    method: 'post',
    data: data
  })
}

// 修改日程安排
export function updateCalendar(data) {
  return request({
    url: '/crm-mytable/calendar',
    method: 'put',
    data: data
  })
}

// 删除日程安排
export function delCalendar(id) {
  return request({
    url: '/crm-mytable/calendar/' + id,
    method: 'delete'
  })
}
