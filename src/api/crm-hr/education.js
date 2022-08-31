import request from '@/utils/request'

// 查询教育明细列表
export function listEducation(query) {
  return request({
    url: '/crm-hr/education/list',
    method: 'get',
    params: query
  })
}

// 查询教育明细详细
export function getEducation(id) {
  return request({
    url: '/crm-hr/education/' + id,
    method: 'get'
  })
}

// 新增教育明细
export function addEducation(data) {
  return request({
    url: '/crm-hr/education',
    method: 'post',
    data: data
  })
}

// 修改教育明细
export function updateEducation(data) {
  return request({
    url: '/crm-hr/education',
    method: 'put',
    data: data
  })
}

// 删除教育明细
export function delEducation(id) {
  return request({
    url: '/crm-hr/education/' + id,
    method: 'delete'
  })
}
