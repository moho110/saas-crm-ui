import request from '@/utils/request'

// 查询系统帮助列表
export function listSystemhelp(query) {
  return request({
    url: '/crm-system/systemhelp/list',
    method: 'get',
    params: query
  })
}

// 查询系统帮助详细
export function getSystemhelp(id) {
  return request({
    url: '/crm-system/systemhelp/' + id,
    method: 'get'
  })
}

// 新增系统帮助
export function addSystemhelp(data) {
  return request({
    url: '/crm-system/systemhelp',
    method: 'post',
    data: data
  })
}

// 修改系统帮助
export function updateSystemhelp(data) {
  return request({
    url: '/crm-system/systemhelp',
    method: 'put',
    data: data
  })
}

// 删除系统帮助
export function delSystemhelp(id) {
  return request({
    url: '/crm-system/systemhelp/' + id,
    method: 'delete'
  })
}
