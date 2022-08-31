import request from '@/utils/request'

// 查询桌面便签表列表
export function listMytablenotes(query) {
  return request({
    url: '/crm-mytable/mytablenotes/list',
    method: 'get',
    params: query
  })
}

// 查询桌面便签表详细
export function getMytablenotes(id) {
  return request({
    url: '/crm-mytable/mytablenotes/' + id,
    method: 'get'
  })
}

// 新增桌面便签表
export function addMytablenotes(data) {
  return request({
    url: '/crm-mytable/mytablenotes',
    method: 'post',
    data: data
  })
}

// 修改桌面便签表
export function updateMytablenotes(data) {
  return request({
    url: '/crm-mytable/mytablenotes',
    method: 'put',
    data: data
  })
}

// 删除桌面便签表
export function delMytablenotes(id) {
  return request({
    url: '/crm-mytable/mytablenotes/' + id,
    method: 'delete'
  })
}
