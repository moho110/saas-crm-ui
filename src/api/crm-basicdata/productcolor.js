import request from '@/utils/request'

// 查询产品颜色列表
export function listProductcolor(query) {
  return request({
    url: '/crm-basicdata/productcolor/list',
    method: 'get',
    params: query
  })
}

// 查询产品颜色详细
export function getProductcolor(id) {
  return request({
    url: '/crm-basicdata/productcolor/' + id,
    method: 'get'
  })
}

// 新增产品颜色
export function addProductcolor(data) {
  return request({
    url: '/crm-basicdata/productcolor',
    method: 'post',
    data: data
  })
}

// 修改产品颜色
export function updateProductcolor(data) {
  return request({
    url: '/crm-basicdata/productcolor',
    method: 'put',
    data: data
  })
}

// 删除产品颜色
export function delProductcolor(id) {
  return request({
    url: '/crm-basicdata/productcolor/' + id,
    method: 'delete'
  })
}
