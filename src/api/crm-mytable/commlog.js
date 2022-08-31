import request from '@/utils/request'

// 查询通用日志列表
export function listCommlog(query) {
  return request({
    url: '/crm-mytable/commlog/list',
    method: 'get',
    params: query
  })
}

// 查询通用日志详细
export function getCommlog(id) {
  return request({
    url: '/crm-mytable/commlog/' + id,
    method: 'get'
  })
}

// 新增通用日志
export function addCommlog(data) {
  return request({
    url: '/crm-mytable/commlog',
    method: 'post',
    data: data
  })
}

// 修改通用日志
export function updateCommlog(data) {
  return request({
    url: '/crm-mytable/commlog',
    method: 'put',
    data: data
  })
}

// 删除通用日志
export function delCommlog(id) {
  return request({
    url: '/crm-mytable/commlog/' + id,
    method: 'delete'
  })
}
