import request from '@/utils/request'

// 查询系统代码列表
export function listCode(query) {
  return request({
    url: '/crm-system/code/list',
    method: 'get',
    params: query
  })
}

// 查询系统代码详细
export function getCode(id) {
  return request({
    url: '/crm-system/code/' + id,
    method: 'get'
  })
}

// 新增系统代码
export function addCode(data) {
  return request({
    url: '/crm-system/code',
    method: 'post',
    data: data
  })
}

// 修改系统代码
export function updateCode(data) {
  return request({
    url: '/crm-system/code',
    method: 'put',
    data: data
  })
}

// 删除系统代码
export function delCode(id) {
  return request({
    url: '/crm-system/code/' + id,
    method: 'delete'
  })
}
