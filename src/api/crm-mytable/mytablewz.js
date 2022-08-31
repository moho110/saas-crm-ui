import request from '@/utils/request'

// 查询桌面显示位置表列表
export function listMytablewz(query) {
  return request({
    url: '/crm-mytable/mytablewz/list',
    method: 'get',
    params: query
  })
}

// 查询桌面显示位置表详细
export function getMytablewz(id) {
  return request({
    url: '/crm-mytable/mytablewz/' + id,
    method: 'get'
  })
}

// 新增桌面显示位置表
export function addMytablewz(data) {
  return request({
    url: '/crm-mytable/mytablewz',
    method: 'post',
    data: data
  })
}

// 修改桌面显示位置表
export function updateMytablewz(data) {
  return request({
    url: '/crm-mytable/mytablewz',
    method: 'put',
    data: data
  })
}

// 删除桌面显示位置表
export function delMytablewz(id) {
  return request({
    url: '/crm-mytable/mytablewz/' + id,
    method: 'delete'
  })
}
