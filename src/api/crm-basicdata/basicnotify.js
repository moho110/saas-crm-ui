import request from '@/utils/request'

// 查询公告通知列表
export function listBasicnotify(query) {
  return request({
    url: '/crm-basicdata/basicnotify/list',
    method: 'get',
    params: query
  })
}

// 查询公告通知详细
export function getBasicnotify(id) {
  return request({
    url: '/crm-basicdata/basicnotify/' + id,
    method: 'get'
  })
}

// 新增公告通知
export function addBasicnotify(data) {
  return request({
    url: '/crm-basicdata/basicnotify',
    method: 'post',
    data: data
  })
}

// 修改公告通知
export function updateBasicnotify(data) {
  return request({
    url: '/crm-basicdata/basicnotify',
    method: 'put',
    data: data
  })
}

// 删除公告通知
export function delBasicnotify(id) {
  return request({
    url: '/crm-basicdata/basicnotify/' + id,
    method: 'delete'
  })
}
