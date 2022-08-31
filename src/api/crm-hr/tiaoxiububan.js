import request from '@/utils/request'

// 查询行政调休补班列表
export function listTiaoxiububan(query) {
  return request({
    url: '/crm-hr/tiaoxiububan/list',
    method: 'get',
    params: query
  })
}

// 查询行政调休补班详细
export function getTiaoxiububan(id) {
  return request({
    url: '/crm-hr/tiaoxiububan/' + id,
    method: 'get'
  })
}

// 新增行政调休补班
export function addTiaoxiububan(data) {
  return request({
    url: '/crm-hr/tiaoxiububan',
    method: 'post',
    data: data
  })
}

// 修改行政调休补班
export function updateTiaoxiububan(data) {
  return request({
    url: '/crm-hr/tiaoxiububan',
    method: 'put',
    data: data
  })
}

// 删除行政调休补班
export function delTiaoxiububan(id) {
  return request({
    url: '/crm-hr/tiaoxiububan/' + id,
    method: 'delete'
  })
}
