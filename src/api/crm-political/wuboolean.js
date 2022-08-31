import request from '@/utils/request'

// 查询是否列表
export function listWuboolean(query) {
  return request({
    url: '/crm-political/wuboolean/list',
    method: 'get',
    params: query
  })
}

// 查询是否详细
export function getWuboolean(id) {
  return request({
    url: '/crm-political/wuboolean/' + id,
    method: 'get'
  })
}

// 新增是否
export function addWuboolean(data) {
  return request({
    url: '/crm-political/wuboolean',
    method: 'post',
    data: data
  })
}

// 修改是否
export function updateWuboolean(data) {
  return request({
    url: '/crm-political/wuboolean',
    method: 'put',
    data: data
  })
}

// 删除是否
export function delWuboolean(id) {
  return request({
    url: '/crm-political/wuboolean/' + id,
    method: 'delete'
  })
}
