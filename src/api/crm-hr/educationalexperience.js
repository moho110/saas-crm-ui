import request from '@/utils/request'

// 查询教育经历列表
export function listEducationalexperience(query) {
  return request({
    url: '/crm-hr/educationalexperience/list',
    method: 'get',
    params: query
  })
}

// 查询教育经历详细
export function getEducationalexperience(id) {
  return request({
    url: '/crm-hr/educationalexperience/' + id,
    method: 'get'
  })
}

// 新增教育经历
export function addEducationalexperience(data) {
  return request({
    url: '/crm-hr/educationalexperience',
    method: 'post',
    data: data
  })
}

// 修改教育经历
export function updateEducationalexperience(data) {
  return request({
    url: '/crm-hr/educationalexperience',
    method: 'put',
    data: data
  })
}

// 删除教育经历
export function delEducationalexperience(id) {
  return request({
    url: '/crm-hr/educationalexperience/' + id,
    method: 'delete'
  })
}
