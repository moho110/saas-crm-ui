import request from '@/utils/request'

// 查询客户方案列表
export function listFangan(query) {
  return request({
    url: '/crm-customer/fangan/list',
    method: 'get',
    params: query
  })
}

// 查询客户方案详细
export function getFangan(id) {
  return request({
    url: '/crm-customer/fangan/' + id,
    method: 'get'
  })
}

// 新增客户方案
export function addFangan(data) {
  return request({
    url: '/crm-customer/fangan',
    method: 'post',
    data: data
  })
}

// 修改客户方案
export function updateFangan(data) {
  return request({
    url: '/crm-customer/fangan',
    method: 'put',
    data: data
  })
}

// 删除客户方案
export function delFangan(id) {
  return request({
    url: '/crm-customer/fangan/' + id,
    method: 'delete'
  })
}
