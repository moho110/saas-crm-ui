import request from '@/utils/request'

// 查询宿舍区域列表
export function listArea(query) {
  return request({
    url: '/crm-political/area/list',
    method: 'get',
    params: query
  })
}

// 查询宿舍区域详细
export function getArea(id) {
  return request({
    url: '/crm-political/area/' + id,
    method: 'get'
  })
}

// 新增宿舍区域
export function addArea(data) {
  return request({
    url: '/crm-political/area',
    method: 'post',
    data: data
  })
}

// 修改宿舍区域
export function updateArea(data) {
  return request({
    url: '/crm-political/area',
    method: 'put',
    data: data
  })
}

// 删除宿舍区域
export function delArea(id) {
  return request({
    url: '/crm-political/area/' + id,
    method: 'delete'
  })
}
