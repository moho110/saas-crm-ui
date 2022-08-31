import request from '@/utils/request'

// 查询招聘计划列表
export function listZpjihua(query) {
  return request({
    url: '/crm-hr/zpjihua/list',
    method: 'get',
    params: query
  })
}

// 查询招聘计划详细
export function getZpjihua(id) {
  return request({
    url: '/crm-hr/zpjihua/' + id,
    method: 'get'
  })
}

// 新增招聘计划
export function addZpjihua(data) {
  return request({
    url: '/crm-hr/zpjihua',
    method: 'post',
    data: data
  })
}

// 修改招聘计划
export function updateZpjihua(data) {
  return request({
    url: '/crm-hr/zpjihua',
    method: 'put',
    data: data
  })
}

// 删除招聘计划
export function delZpjihua(id) {
  return request({
    url: '/crm-hr/zpjihua/' + id,
    method: 'delete'
  })
}
