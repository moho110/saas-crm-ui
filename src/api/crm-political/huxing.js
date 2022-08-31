import request from '@/utils/request'

// 查询户型列表
export function listHuxing(query) {
  return request({
    url: '/crm-political/huxing/list',
    method: 'get',
    params: query
  })
}

// 查询户型详细
export function getHuxing(id) {
  return request({
    url: '/crm-political/huxing/' + id,
    method: 'get'
  })
}

// 新增户型
export function addHuxing(data) {
  return request({
    url: '/crm-political/huxing',
    method: 'post',
    data: data
  })
}

// 修改户型
export function updateHuxing(data) {
  return request({
    url: '/crm-political/huxing',
    method: 'put',
    data: data
  })
}

// 删除户型
export function delHuxing(id) {
  return request({
    url: '/crm-political/huxing/' + id,
    method: 'delete'
  })
}
