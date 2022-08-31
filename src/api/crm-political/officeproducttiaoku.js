import request from '@/utils/request'

// 查询办公用品调库列表
export function listOfficeproducttiaoku(query) {
  return request({
    url: '/crm-political/officeproducttiaoku/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品调库详细
export function getOfficeproducttiaoku(id) {
  return request({
    url: '/crm-political/officeproducttiaoku/' + id,
    method: 'get'
  })
}

// 新增办公用品调库
export function addOfficeproducttiaoku(data) {
  return request({
    url: '/crm-political/officeproducttiaoku',
    method: 'post',
    data: data
  })
}

// 修改办公用品调库
export function updateOfficeproducttiaoku(data) {
  return request({
    url: '/crm-political/officeproducttiaoku',
    method: 'put',
    data: data
  })
}

// 删除办公用品调库
export function delOfficeproducttiaoku(id) {
  return request({
    url: '/crm-political/officeproducttiaoku/' + id,
    method: 'delete'
  })
}
