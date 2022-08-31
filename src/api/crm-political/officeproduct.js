import request from '@/utils/request'

// 查询办公用品列表列表
export function listOfficeproduct(query) {
  return request({
    url: '/crm-political/officeproduct/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品列表详细
export function getOfficeproduct(id) {
  return request({
    url: '/crm-political/officeproduct/' + id,
    method: 'get'
  })
}

// 新增办公用品列表
export function addOfficeproduct(data) {
  return request({
    url: '/crm-political/officeproduct',
    method: 'post',
    data: data
  })
}

// 修改办公用品列表
export function updateOfficeproduct(data) {
  return request({
    url: '/crm-political/officeproduct',
    method: 'put',
    data: data
  })
}

// 删除办公用品列表
export function delOfficeproduct(id) {
  return request({
    url: '/crm-political/officeproduct/' + id,
    method: 'delete'
  })
}
