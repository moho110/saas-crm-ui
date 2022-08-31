import request from '@/utils/request'

// 查询产品组装明细列表
export function listDetail(query) {
  return request({
    url: '/crm-basicdata/detail/list',
    method: 'get',
    params: query
  })
}

// 查询产品组装明细详细
export function getDetail(id) {
  return request({
    url: '/crm-basicdata/detail/' + id,
    method: 'get'
  })
}

// 新增产品组装明细
export function addDetail(data) {
  return request({
    url: '/crm-basicdata/detail',
    method: 'post',
    data: data
  })
}

// 修改产品组装明细
export function updateDetail(data) {
  return request({
    url: '/crm-basicdata/detail',
    method: 'put',
    data: data
  })
}

// 删除产品组装明细
export function delDetail(id) {
  return request({
    url: '/crm-basicdata/detail/' + id,
    method: 'delete'
  })
}
