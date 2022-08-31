import request from '@/utils/request'

// 查询日程类型列表
export function listCalendartype(query) {
  return request({
    url: '/crm-mytable/calendartype/list',
    method: 'get',
    params: query
  })
}

// 查询日程类型详细
export function getCalendartype(id) {
  return request({
    url: '/crm-mytable/calendartype/' + id,
    method: 'get'
  })
}

// 新增日程类型
export function addCalendartype(data) {
  return request({
    url: '/crm-mytable/calendartype',
    method: 'post',
    data: data
  })
}

// 修改日程类型
export function updateCalendartype(data) {
  return request({
    url: '/crm-mytable/calendartype',
    method: 'put',
    data: data
  })
}

// 删除日程类型
export function delCalendartype(id) {
  return request({
    url: '/crm-mytable/calendartype/' + id,
    method: 'delete'
  })
}
