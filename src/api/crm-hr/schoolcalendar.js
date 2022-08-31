import request from '@/utils/request'

// 查询校历列表
export function listSchoolcalendar(query) {
  return request({
    url: '/crm-hr/schoolcalendar/list',
    method: 'get',
    params: query
  })
}

// 查询校历详细
export function getSchoolcalendar(id) {
  return request({
    url: '/crm-hr/schoolcalendar/' + id,
    method: 'get'
  })
}

// 新增校历
export function addSchoolcalendar(data) {
  return request({
    url: '/crm-hr/schoolcalendar',
    method: 'post',
    data: data
  })
}

// 修改校历
export function updateSchoolcalendar(data) {
  return request({
    url: '/crm-hr/schoolcalendar',
    method: 'put',
    data: data
  })
}

// 删除校历
export function delSchoolcalendar(id) {
  return request({
    url: '/crm-hr/schoolcalendar/' + id,
    method: 'delete'
  })
}
