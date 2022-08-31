import request from '@/utils/request'

// 查询国籍列表
export function listNational(query) {
  return request({
    url: '/crm-political/national/list',
    method: 'get',
    params: query
  })
}

// 查询国籍详细
export function getNational(id) {
  return request({
    url: '/crm-political/national/' + id,
    method: 'get'
  })
}

// 新增国籍
export function addNational(data) {
  return request({
    url: '/crm-political/national',
    method: 'post',
    data: data
  })
}

// 修改国籍
export function updateNational(data) {
  return request({
    url: '/crm-political/national',
    method: 'put',
    data: data
  })
}

// 删除国籍
export function delNational(id) {
  return request({
    url: '/crm-political/national/' + id,
    method: 'delete'
  })
}
