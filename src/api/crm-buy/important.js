import request from '@/utils/request'

// 查询重要性列表
export function listImportant(query) {
  return request({
    url: '/crm-buy/important/list',
    method: 'get',
    params: query
  })
}

// 查询重要性详细
export function getImportant(id) {
  return request({
    url: '/crm-buy/important/' + id,
    method: 'get'
  })
}

// 新增重要性
export function addImportant(data) {
  return request({
    url: '/crm-buy/important',
    method: 'post',
    data: data
  })
}

// 修改重要性
export function updateImportant(data) {
  return request({
    url: '/crm-buy/important',
    method: 'put',
    data: data
  })
}

// 删除重要性
export function delImportant(id) {
  return request({
    url: '/crm-buy/important/' + id,
    method: 'delete'
  })
}
