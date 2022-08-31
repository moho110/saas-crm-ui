import request from '@/utils/request'

// 查询费用类型列表
export function listType(query) {
  return request({
    url: '/crm-hr/type/list',
    method: 'get',
    params: query
  })
}

// 查询费用类型详细
export function getType(id) {
  return request({
    url: '/crm-hr/type/' + id,
    method: 'get'
  })
}

// 新增费用类型
export function addType(data) {
  return request({
    url: '/crm-hr/type',
    method: 'post',
    data: data
  })
}

// 修改费用类型
export function updateType(data) {
  return request({
    url: '/crm-hr/type',
    method: 'put',
    data: data
  })
}

// 删除费用类型
export function delType(id) {
  return request({
    url: '/crm-hr/type/' + id,
    method: 'delete'
  })
}
