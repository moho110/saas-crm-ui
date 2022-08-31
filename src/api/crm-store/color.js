import request from '@/utils/request'

// 查询库存明细颜色列表
export function listColor(query) {
  return request({
    url: '/crm-store/color/list',
    method: 'get',
    params: query
  })
}

// 查询库存明细颜色详细
export function getColor(id) {
  return request({
    url: '/crm-store/color/' + id,
    method: 'get'
  })
}

// 新增库存明细颜色
export function addColor(data) {
  return request({
    url: '/crm-store/color',
    method: 'post',
    data: data
  })
}

// 修改库存明细颜色
export function updateColor(data) {
  return request({
    url: '/crm-store/color',
    method: 'put',
    data: data
  })
}

// 删除库存明细颜色
export function delColor(id) {
  return request({
    url: '/crm-store/color/' + id,
    method: 'delete'
  })
}
