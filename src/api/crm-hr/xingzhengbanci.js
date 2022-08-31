import request from '@/utils/request'

// 查询行政班次列表
export function listXingzhengbanci(query) {
  return request({
    url: '/crm-hr/xingzhengbanci/list',
    method: 'get',
    params: query
  })
}

// 查询行政班次详细
export function getXingzhengbanci(id) {
  return request({
    url: '/crm-hr/xingzhengbanci/' + id,
    method: 'get'
  })
}

// 新增行政班次
export function addXingzhengbanci(data) {
  return request({
    url: '/crm-hr/xingzhengbanci',
    method: 'post',
    data: data
  })
}

// 修改行政班次
export function updateXingzhengbanci(data) {
  return request({
    url: '/crm-hr/xingzhengbanci',
    method: 'put',
    data: data
  })
}

// 删除行政班次
export function delXingzhengbanci(id) {
  return request({
    url: '/crm-hr/xingzhengbanci/' + id,
    method: 'delete'
  })
}
