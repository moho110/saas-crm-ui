import request from '@/utils/request'

// 查询系统表列表
export function listSystemtable(query) {
  return request({
    url: '/crm-system/systemtable/list',
    method: 'get',
    params: query
  })
}

// 查询系统表详细
export function getSystemtable(id) {
  return request({
    url: '/crm-system/systemtable/' + id,
    method: 'get'
  })
}

// 新增系统表
export function addSystemtable(data) {
  return request({
    url: '/crm-system/systemtable',
    method: 'post',
    data: data
  })
}

// 修改系统表
export function updateSystemtable(data) {
  return request({
    url: '/crm-system/systemtable',
    method: 'put',
    data: data
  })
}

// 删除系统表
export function delSystemtable(id) {
  return request({
    url: '/crm-system/systemtable/' + id,
    method: 'delete'
  })
}
