import request from '@/utils/request'

// 查询转职明细列表
export function listHrtransfer(query) {
  return request({
    url: '/crm-hr/hrtransfer/list',
    method: 'get',
    params: query
  })
}

// 查询转职明细详细
export function getHrtransfer(id) {
  return request({
    url: '/crm-hr/hrtransfer/' + id,
    method: 'get'
  })
}

// 新增转职明细
export function addHrtransfer(data) {
  return request({
    url: '/crm-hr/hrtransfer',
    method: 'post',
    data: data
  })
}

// 修改转职明细
export function updateHrtransfer(data) {
  return request({
    url: '/crm-hr/hrtransfer',
    method: 'put',
    data: data
  })
}

// 删除转职明细
export function delHrtransfer(id) {
  return request({
    url: '/crm-hr/hrtransfer/' + id,
    method: 'delete'
  })
}
