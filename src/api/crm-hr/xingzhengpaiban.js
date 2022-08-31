import request from '@/utils/request'

// 查询行政排班列表
export function listXingzhengpaiban(query) {
  return request({
    url: '/crm-hr/xingzhengpaiban/list',
    method: 'get',
    params: query
  })
}

// 查询行政排班详细
export function getXingzhengpaiban(id) {
  return request({
    url: '/crm-hr/xingzhengpaiban/' + id,
    method: 'get'
  })
}

// 新增行政排班
export function addXingzhengpaiban(data) {
  return request({
    url: '/crm-hr/xingzhengpaiban',
    method: 'post',
    data: data
  })
}

// 修改行政排班
export function updateXingzhengpaiban(data) {
  return request({
    url: '/crm-hr/xingzhengpaiban',
    method: 'put',
    data: data
  })
}

// 删除行政排班
export function delXingzhengpaiban(id) {
  return request({
    url: '/crm-hr/xingzhengpaiban/' + id,
    method: 'delete'
  })
}
