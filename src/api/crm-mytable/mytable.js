import request from '@/utils/request'

// 查询桌面模块表列表
export function listMytable(query) {
  return request({
    url: '/crm-mytable/mytable/list',
    method: 'get',
    params: query
  })
}

// 查询桌面模块表详细
export function getMytable(id) {
  return request({
    url: '/crm-mytable/mytable/' + id,
    method: 'get'
  })
}

// 新增桌面模块表
export function addMytable(data) {
  return request({
    url: '/crm-mytable/mytable',
    method: 'post',
    data: data
  })
}

// 修改桌面模块表
export function updateMytable(data) {
  return request({
    url: '/crm-mytable/mytable',
    method: 'put',
    data: data
  })
}

// 删除桌面模块表
export function delMytable(id) {
  return request({
    url: '/crm-mytable/mytable/' + id,
    method: 'delete'
  })
}
