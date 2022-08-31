import request from '@/utils/request'

// 查询系统语言列表
export function listSystemlang(query) {
  return request({
    url: '/crm-system/systemlang/list',
    method: 'get',
    params: query
  })
}

// 查询系统语言详细
export function getSystemlang(id) {
  return request({
    url: '/crm-system/systemlang/' + id,
    method: 'get'
  })
}

// 新增系统语言
export function addSystemlang(data) {
  return request({
    url: '/crm-system/systemlang',
    method: 'post',
    data: data
  })
}

// 修改系统语言
export function updateSystemlang(data) {
  return request({
    url: '/crm-system/systemlang',
    method: 'put',
    data: data
  })
}

// 删除系统语言
export function delSystemlang(id) {
  return request({
    url: '/crm-system/systemlang/' + id,
    method: 'delete'
  })
}
