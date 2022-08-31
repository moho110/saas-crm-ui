import request from '@/utils/request'

// 查询办公用品类别列表
export function listOfficeproductleibie(query) {
  return request({
    url: '/crm-political/officeproductleibie/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品类别详细
export function getOfficeproductleibie(id) {
  return request({
    url: '/crm-political/officeproductleibie/' + id,
    method: 'get'
  })
}

// 新增办公用品类别
export function addOfficeproductleibie(data) {
  return request({
    url: '/crm-political/officeproductleibie',
    method: 'post',
    data: data
  })
}

// 修改办公用品类别
export function updateOfficeproductleibie(data) {
  return request({
    url: '/crm-political/officeproductleibie',
    method: 'put',
    data: data
  })
}

// 删除办公用品类别
export function delOfficeproductleibie(id) {
  return request({
    url: '/crm-political/officeproductleibie/' + id,
    method: 'delete'
  })
}
