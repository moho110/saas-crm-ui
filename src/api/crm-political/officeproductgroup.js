import request from '@/utils/request'

// 查询办公用品分类列表
export function listOfficeproductgroup(query) {
  return request({
    url: '/crm-political/officeproductgroup/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品分类详细
export function getOfficeproductgroup(id) {
  return request({
    url: '/crm-political/officeproductgroup/' + id,
    method: 'get'
  })
}

// 新增办公用品分类
export function addOfficeproductgroup(data) {
  return request({
    url: '/crm-political/officeproductgroup',
    method: 'post',
    data: data
  })
}

// 修改办公用品分类
export function updateOfficeproductgroup(data) {
  return request({
    url: '/crm-political/officeproductgroup',
    method: 'put',
    data: data
  })
}

// 删除办公用品分类
export function delOfficeproductgroup(id) {
  return request({
    url: '/crm-political/officeproductgroup/' + id,
    method: 'delete'
  })
}
