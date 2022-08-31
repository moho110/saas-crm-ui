import request from '@/utils/request'

// 查询办公用品入库列表
export function listOfficeproductin(query) {
  return request({
    url: '/crm-political/officeproductin/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品入库详细
export function getOfficeproductin(id) {
  return request({
    url: '/crm-political/officeproductin/' + id,
    method: 'get'
  })
}

// 新增办公用品入库
export function addOfficeproductin(data) {
  return request({
    url: '/crm-political/officeproductin',
    method: 'post',
    data: data
  })
}

// 修改办公用品入库
export function updateOfficeproductin(data) {
  return request({
    url: '/crm-political/officeproductin',
    method: 'put',
    data: data
  })
}

// 删除办公用品入库
export function delOfficeproductin(id) {
  return request({
    url: '/crm-political/officeproductin/' + id,
    method: 'delete'
  })
}
