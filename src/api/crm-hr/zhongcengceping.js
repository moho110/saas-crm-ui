import request from '@/utils/request'

// 查询中层测评列表
export function listZhongcengceping(query) {
  return request({
    url: '/crm-hr/zhongcengceping/list',
    method: 'get',
    params: query
  })
}

// 查询中层测评详细
export function getZhongcengceping(id) {
  return request({
    url: '/crm-hr/zhongcengceping/' + id,
    method: 'get'
  })
}

// 新增中层测评
export function addZhongcengceping(data) {
  return request({
    url: '/crm-hr/zhongcengceping',
    method: 'post',
    data: data
  })
}

// 修改中层测评
export function updateZhongcengceping(data) {
  return request({
    url: '/crm-hr/zhongcengceping',
    method: 'put',
    data: data
  })
}

// 删除中层测评
export function delZhongcengceping(id) {
  return request({
    url: '/crm-hr/zhongcengceping/' + id,
    method: 'delete'
  })
}
