import request from '@/utils/request'

// 查询供应商产品列表
export function listSupplyproduct(query) {
  return request({
    url: '/crm-basicdata/supplyproduct/list',
    method: 'get',
    params: query
  })
}

// 查询供应商产品详细
export function getSupplyproduct(id) {
  return request({
    url: '/crm-basicdata/supplyproduct/' + id,
    method: 'get'
  })
}

// 新增供应商产品
export function addSupplyproduct(data) {
  return request({
    url: '/crm-basicdata/supplyproduct',
    method: 'post',
    data: data
  })
}

// 修改供应商产品
export function updateSupplyproduct(data) {
  return request({
    url: '/crm-basicdata/supplyproduct',
    method: 'put',
    data: data
  })
}

// 删除供应商产品
export function delSupplyproduct(id) {
  return request({
    url: '/crm-basicdata/supplyproduct/' + id,
    method: 'delete'
  })
}
