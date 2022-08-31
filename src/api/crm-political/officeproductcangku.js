import request from '@/utils/request'

// 查询办公用品仓库列表
export function listOfficeproductcangku(query) {
  return request({
    url: '/crm-political/officeproductcangku/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品仓库详细
export function getOfficeproductcangku(id) {
  return request({
    url: '/crm-political/officeproductcangku/' + id,
    method: 'get'
  })
}

// 新增办公用品仓库
export function addOfficeproductcangku(data) {
  return request({
    url: '/crm-political/officeproductcangku',
    method: 'post',
    data: data
  })
}

// 修改办公用品仓库
export function updateOfficeproductcangku(data) {
  return request({
    url: '/crm-political/officeproductcangku',
    method: 'put',
    data: data
  })
}

// 删除办公用品仓库
export function delOfficeproductcangku(id) {
  return request({
    url: '/crm-political/officeproductcangku/' + id,
    method: 'delete'
  })
}
