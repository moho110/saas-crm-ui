import request from '@/utils/request'

// 查询紧急程度列表
export function listDictnotify(query) {
  return request({
    url: '/crm-mytable/dictnotify/list',
    method: 'get',
    params: query
  })
}

// 查询紧急程度详细
export function getDictnotify(id) {
  return request({
    url: '/crm-mytable/dictnotify/' + id,
    method: 'get'
  })
}

// 新增紧急程度
export function addDictnotify(data) {
  return request({
    url: '/crm-mytable/dictnotify',
    method: 'post',
    data: data
  })
}

// 修改紧急程度
export function updateDictnotify(data) {
  return request({
    url: '/crm-mytable/dictnotify',
    method: 'put',
    data: data
  })
}

// 删除紧急程度
export function delDictnotify(id) {
  return request({
    url: '/crm-mytable/dictnotify/' + id,
    method: 'delete'
  })
}
