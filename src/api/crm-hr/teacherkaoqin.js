import request from '@/utils/request'

// 查询教师考勤列表
export function listTeacherkaoqin(query) {
  return request({
    url: '/crm-hr/teacherkaoqin/list',
    method: 'get',
    params: query
  })
}

// 查询教师考勤详细
export function getTeacherkaoqin(id) {
  return request({
    url: '/crm-hr/teacherkaoqin/' + id,
    method: 'get'
  })
}

// 新增教师考勤
export function addTeacherkaoqin(data) {
  return request({
    url: '/crm-hr/teacherkaoqin',
    method: 'post',
    data: data
  })
}

// 修改教师考勤
export function updateTeacherkaoqin(data) {
  return request({
    url: '/crm-hr/teacherkaoqin',
    method: 'put',
    data: data
  })
}

// 删除教师考勤
export function delTeacherkaoqin(id) {
  return request({
    url: '/crm-hr/teacherkaoqin/' + id,
    method: 'delete'
  })
}
