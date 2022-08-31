import request from '@/utils/request'

// 查询回收站列表
export function listBasicbin(query) {
  return request({
    url: '/crm-basicdata/basicbin/list',
    method: 'get',
    params: query
  })
}

// 查询回收站详细
export function getBasicbin(id) {
  return request({
    url: '/crm-basicdata/basicbin/' + id,
    method: 'get'
  })
}

// 新增回收站
export function addBasicbin(data) {
  return request({
    url: '/crm-basicdata/basicbin',
    method: 'post',
    data: data
  })
}

// 修改回收站
export function updateBasicbin(data) {
  return request({
    url: '/crm-basicdata/basicbin',
    method: 'put',
    data: data
  })
}

// 删除回收站
export function delBasicbin(id) {
  return request({
    url: '/crm-basicdata/basicbin/' + id,
    method: 'delete'
  })
}
