import request from '@/utils/request'

// 查询办公用品出库列表
export function listOfficeproductout(query) {
  return request({
    url: '/crm-political/officeproductout/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品出库详细
export function getOfficeproductout(id) {
  return request({
    url: '/crm-political/officeproductout/' + id,
    method: 'get'
  })
}

// 新增办公用品出库
export function addOfficeproductout(data) {
  return request({
    url: '/crm-political/officeproductout',
    method: 'post',
    data: data
  })
}

// 修改办公用品出库
export function updateOfficeproductout(data) {
  return request({
    url: '/crm-political/officeproductout',
    method: 'put',
    data: data
  })
}

// 删除办公用品出库
export function delOfficeproductout(id) {
  return request({
    url: '/crm-political/officeproductout/' + id,
    method: 'delete'
  })
}
