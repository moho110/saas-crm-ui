import request from '@/utils/request'

// 查询仓库管理调拔明细列表
export function listChangmaindetail(query) {
  return request({
    url: '/crm-store/changmaindetail/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理调拔明细详细
export function getChangmaindetail(id) {
  return request({
    url: '/crm-store/changmaindetail/' + id,
    method: 'get'
  })
}

// 新增仓库管理调拔明细
export function addChangmaindetail(data) {
  return request({
    url: '/crm-store/changmaindetail',
    method: 'post',
    data: data
  })
}

// 修改仓库管理调拔明细
export function updateChangmaindetail(data) {
  return request({
    url: '/crm-store/changmaindetail',
    method: 'put',
    data: data
  })
}

// 删除仓库管理调拔明细
export function delChangmaindetail(id) {
  return request({
    url: '/crm-store/changmaindetail/' + id,
    method: 'delete'
  })
}
