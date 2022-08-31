import request from '@/utils/request'

// 查询预收款记录列表
export function listAccesspreshou(query) {
  return request({
    url: '/crm-finance/accesspreshou/list',
    method: 'get',
    params: query
  })
}

// 查询预收款记录详细
export function getAccesspreshou(id) {
  return request({
    url: '/crm-finance/accesspreshou/' + id,
    method: 'get'
  })
}

// 新增预收款记录
export function addAccesspreshou(data) {
  return request({
    url: '/crm-finance/accesspreshou',
    method: 'post',
    data: data
  })
}

// 修改预收款记录
export function updateAccesspreshou(data) {
  return request({
    url: '/crm-finance/accesspreshou',
    method: 'put',
    data: data
  })
}

// 删除预收款记录
export function delAccesspreshou(id) {
  return request({
    url: '/crm-finance/accesspreshou/' + id,
    method: 'delete'
  })
}
