import request from '@/utils/request'

// 查询办公用品报废列表
export function listOfficeproductbaofei(query) {
  return request({
    url: '/crm-political/officeproductbaofei/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品报废详细
export function getOfficeproductbaofei(id) {
  return request({
    url: '/crm-political/officeproductbaofei/' + id,
    method: 'get'
  })
}

// 新增办公用品报废
export function addOfficeproductbaofei(data) {
  return request({
    url: '/crm-political/officeproductbaofei',
    method: 'post',
    data: data
  })
}

// 修改办公用品报废
export function updateOfficeproductbaofei(data) {
  return request({
    url: '/crm-political/officeproductbaofei',
    method: 'put',
    data: data
  })
}

// 删除办公用品报废
export function delOfficeproductbaofei(id) {
  return request({
    url: '/crm-political/officeproductbaofei/' + id,
    method: 'delete'
  })
}
