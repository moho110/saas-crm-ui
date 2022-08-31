import request from '@/utils/request'

// 查询日常费用列表
export function listExpense(query) {
  return request({
    url: '/crm-hr/expense/list',
    method: 'get',
    params: query
  })
}

// 查询日常费用详细
export function getExpense(id) {
  return request({
    url: '/crm-hr/expense/' + id,
    method: 'get'
  })
}

// 新增日常费用
export function addExpense(data) {
  return request({
    url: '/crm-hr/expense',
    method: 'post',
    data: data
  })
}

// 修改日常费用
export function updateExpense(data) {
  return request({
    url: '/crm-hr/expense',
    method: 'put',
    data: data
  })
}

// 删除日常费用
export function delExpense(id) {
  return request({
    url: '/crm-hr/expense/' + id,
    method: 'delete'
  })
}
