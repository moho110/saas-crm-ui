import request from '@/utils/request'

// 查询办公用品归还列表
export function listOfficeproducttui(query) {
  return request({
    url: '/crm-political/officeproducttui/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品归还详细
export function getOfficeproducttui(id) {
  return request({
    url: '/crm-political/officeproducttui/' + id,
    method: 'get'
  })
}

// 新增办公用品归还
export function addOfficeproducttui(data) {
  return request({
    url: '/crm-political/officeproducttui',
    method: 'post',
    data: data
  })
}

// 修改办公用品归还
export function updateOfficeproducttui(data) {
  return request({
    url: '/crm-political/officeproducttui',
    method: 'put',
    data: data
  })
}

// 删除办公用品归还
export function delOfficeproducttui(id) {
  return request({
    url: '/crm-political/officeproducttui/' + id,
    method: 'delete'
  })
}
