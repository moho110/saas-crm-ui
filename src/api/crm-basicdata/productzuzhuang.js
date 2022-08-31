import request from '@/utils/request'

// 查询产品组装列表
export function listProductzuzhuang(query) {
  return request({
    url: '/crm-basicdata/productzuzhuang/list',
    method: 'get',
    params: query
  })
}

// 查询产品组装详细
export function getProductzuzhuang(id) {
  return request({
    url: '/crm-basicdata/productzuzhuang/' + id,
    method: 'get'
  })
}

// 新增产品组装
export function addProductzuzhuang(data) {
  return request({
    url: '/crm-basicdata/productzuzhuang',
    method: 'post',
    data: data
  })
}

// 修改产品组装
export function updateProductzuzhuang(data) {
  return request({
    url: '/crm-basicdata/productzuzhuang',
    method: 'put',
    data: data
  })
}

// 删除产品组装
export function delProductzuzhuang(id) {
  return request({
    url: '/crm-basicdata/productzuzhuang/' + id,
    method: 'delete'
  })
}
