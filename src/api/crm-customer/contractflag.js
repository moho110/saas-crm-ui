import request from '@/utils/request'

// 查询合同标识列表
export function listContractflag(query) {
  return request({
    url: '/crm-customer/contractflag/list',
    method: 'get',
    params: query
  })
}

// 查询合同标识详细
export function getContractflag(id) {
  return request({
    url: '/crm-customer/contractflag/' + id,
    method: 'get'
  })
}

// 新增合同标识
export function addContractflag(data) {
  return request({
    url: '/crm-customer/contractflag',
    method: 'post',
    data: data
  })
}

// 修改合同标识
export function updateContractflag(data) {
  return request({
    url: '/crm-customer/contractflag',
    method: 'put',
    data: data
  })
}

// 删除合同标识
export function delContractflag(id) {
  return request({
    url: '/crm-customer/contractflag/' + id,
    method: 'delete'
  })
}
