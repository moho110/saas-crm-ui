import request from '@/utils/request'

// 查询供应商列表
export function listSupply(query) {
  return request({
    url: '/crm-basicdata/supply/list',
    method: 'get',
    params: query
  })
}

// 查询供应商详细
export function getSupply(id) {
  return request({
    url: '/crm-basicdata/supply/' + id,
    method: 'get'
  })
}

// 新增供应商
export function addSupply(data) {
  return request({
    url: '/crm-basicdata/supply',
    method: 'post',
    data: data
  })
}

// 修改供应商
export function updateSupply(data) {
  return request({
    url: '/crm-basicdata/supply',
    method: 'put',
    data: data
  })
}

// 删除供应商
export function delSupply(id) {
  return request({
    url: '/crm-basicdata/supply/' + id,
    method: 'delete'
  })
}
