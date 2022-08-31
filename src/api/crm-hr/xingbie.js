import request from '@/utils/request'

// 查询性别列表
export function listXingbie(query) {
  return request({
    url: '/crm-hr/xingbie/list',
    method: 'get',
    params: query
  })
}

// 查询性别详细
export function getXingbie(id) {
  return request({
    url: '/crm-hr/xingbie/' + id,
    method: 'get'
  })
}

// 新增性别
export function addXingbie(data) {
  return request({
    url: '/crm-hr/xingbie',
    method: 'post',
    data: data
  })
}

// 修改性别
export function updateXingbie(data) {
  return request({
    url: '/crm-hr/xingbie',
    method: 'put',
    data: data
  })
}

// 删除性别
export function delXingbie(id) {
  return request({
    url: '/crm-hr/xingbie/' + id,
    method: 'delete'
  })
}
