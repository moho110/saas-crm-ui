import request from '@/utils/request'

// 查询帐户注入列表
export function listBankzhuru(query) {
  return request({
    url: '/crm-finance/bankzhuru/list',
    method: 'get',
    params: query
  })
}

// 查询帐户注入详细
export function getBankzhuru(id) {
  return request({
    url: '/crm-finance/bankzhuru/' + id,
    method: 'get'
  })
}

// 新增帐户注入
export function addBankzhuru(data) {
  return request({
    url: '/crm-finance/bankzhuru',
    method: 'post',
    data: data
  })
}

// 修改帐户注入
export function updateBankzhuru(data) {
  return request({
    url: '/crm-finance/bankzhuru',
    method: 'put',
    data: data
  })
}

// 删除帐户注入
export function delBankzhuru(id) {
  return request({
    url: '/crm-finance/bankzhuru/' + id,
    method: 'delete'
  })
}
