import request from '@/utils/request'

// 查询阶段列表
export function listJieduan(query) {
  return request({
    url: '/crm-basicdata/jieduan/list',
    method: 'get',
    params: query
  })
}

// 查询阶段详细
export function getJieduan(id) {
  return request({
    url: '/crm-basicdata/jieduan/' + id,
    method: 'get'
  })
}

// 新增阶段
export function addJieduan(data) {
  return request({
    url: '/crm-basicdata/jieduan',
    method: 'post',
    data: data
  })
}

// 修改阶段
export function updateJieduan(data) {
  return request({
    url: '/crm-basicdata/jieduan',
    method: 'put',
    data: data
  })
}

// 删除阶段
export function delJieduan(id) {
  return request({
    url: '/crm-basicdata/jieduan/' + id,
    method: 'delete'
  })
}
