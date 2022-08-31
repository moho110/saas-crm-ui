import request from '@/utils/request'

// 查询行政调班列表
export function listXingzhengtiaoban(query) {
  return request({
    url: '/crm-hr/xingzhengtiaoban/list',
    method: 'get',
    params: query
  })
}

// 查询行政调班详细
export function getXingzhengtiaoban(id) {
  return request({
    url: '/crm-hr/xingzhengtiaoban/' + id,
    method: 'get'
  })
}

// 新增行政调班
export function addXingzhengtiaoban(data) {
  return request({
    url: '/crm-hr/xingzhengtiaoban',
    method: 'post',
    data: data
  })
}

// 修改行政调班
export function updateXingzhengtiaoban(data) {
  return request({
    url: '/crm-hr/xingzhengtiaoban',
    method: 'put',
    data: data
  })
}

// 删除行政调班
export function delXingzhengtiaoban(id) {
  return request({
    url: '/crm-hr/xingzhengtiaoban/' + id,
    method: 'delete'
  })
}
