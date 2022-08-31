import request from '@/utils/request'

// 查询银行帐户列表
export function listBank(query) {
  return request({
    url: '/crm-basicdata/bank/list',
    method: 'get',
    params: query
  })
}

// 查询银行帐户详细
export function getBank(id) {
  return request({
    url: '/crm-basicdata/bank/' + id,
    method: 'get'
  })
}

// 新增银行帐户
export function addBank(data) {
  return request({
    url: '/crm-basicdata/bank',
    method: 'post',
    data: data
  })
}

// 修改银行帐户
export function updateBank(data) {
  return request({
    url: '/crm-basicdata/bank',
    method: 'put',
    data: data
  })
}

// 删除银行帐户
export function delBank(id) {
  return request({
    url: '/crm-basicdata/bank/' + id,
    method: 'delete'
  })
}
