import request from '@/utils/request'

// 查询办公任务列表
export function listOfficetask(query) {
  return request({
    url: '/crm-political/officetask/list',
    method: 'get',
    params: query
  })
}

// 查询办公任务详细
export function getOfficetask(id) {
  return request({
    url: '/crm-political/officetask/' + id,
    method: 'get'
  })
}

// 新增办公任务
export function addOfficetask(data) {
  return request({
    url: '/crm-political/officetask',
    method: 'post',
    data: data
  })
}

// 修改办公任务
export function updateOfficetask(data) {
  return request({
    url: '/crm-political/officetask',
    method: 'put',
    data: data
  })
}

// 删除办公任务
export function delOfficetask(id) {
  return request({
    url: '/crm-political/officetask/' + id,
    method: 'delete'
  })
}
