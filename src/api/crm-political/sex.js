import request from '@/utils/request'

// 查询性别列表
export function listSex(query) {
  return request({
    url: '/crm-political/sex/list',
    method: 'get',
    params: query
  })
}

// 查询性别详细
export function getSex(id) {
  return request({
    url: '/crm-political/sex/' + id,
    method: 'get'
  })
}

// 新增性别
export function addSex(data) {
  return request({
    url: '/crm-political/sex',
    method: 'post',
    data: data
  })
}

// 修改性别
export function updateSex(data) {
  return request({
    url: '/crm-political/sex',
    method: 'put',
    data: data
  })
}

// 删除性别
export function delSex(id) {
  return request({
    url: '/crm-political/sex/' + id,
    method: 'delete'
  })
}
