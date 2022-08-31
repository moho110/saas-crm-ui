import request from '@/utils/request'

// 查询产品类型列表
export function listProducttype(query) {
  return request({
    url: '/crm-basicdata/producttype/list',
    method: 'get',
    params: query
  })
}

// 查询产品类型详细
export function getProducttype(id) {
  return request({
    url: '/crm-basicdata/producttype/' + id,
    method: 'get'
  })
}

// 新增产品类型
export function addProducttype(data) {
  return request({
    url: '/crm-basicdata/producttype',
    method: 'post',
    data: data
  })
}

// 修改产品类型
export function updateProducttype(data) {
  return request({
    url: '/crm-basicdata/producttype',
    method: 'put',
    data: data
  })
}

// 删除产品类型
export function delProducttype(id) {
  return request({
    url: '/crm-basicdata/producttype/' + id,
    method: 'delete'
  })
}
