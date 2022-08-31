import request from '@/utils/request'

// 查询行政分类列表
export function listXingzhenggroup(query) {
  return request({
    url: '/crm-hr/xingzhenggroup/list',
    method: 'get',
    params: query
  })
}

// 查询行政分类详细
export function getXingzhenggroup(id) {
  return request({
    url: '/crm-hr/xingzhenggroup/' + id,
    method: 'get'
  })
}

// 新增行政分类
export function addXingzhenggroup(data) {
  return request({
    url: '/crm-hr/xingzhenggroup',
    method: 'post',
    data: data
  })
}

// 修改行政分类
export function updateXingzhenggroup(data) {
  return request({
    url: '/crm-hr/xingzhenggroup',
    method: 'put',
    data: data
  })
}

// 删除行政分类
export function delXingzhenggroup(id) {
  return request({
    url: '/crm-hr/xingzhenggroup/' + id,
    method: 'delete'
  })
}
