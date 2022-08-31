import request from '@/utils/request'

// 查询教学楼列表
export function listBuilding(query) {
  return request({
    url: '/crm-political/building/list',
    method: 'get',
    params: query
  })
}

// 查询教学楼详细
export function getBuilding(id) {
  return request({
    url: '/crm-political/building/' + id,
    method: 'get'
  })
}

// 新增教学楼
export function addBuilding(data) {
  return request({
    url: '/crm-political/building',
    method: 'post',
    data: data
  })
}

// 修改教学楼
export function updateBuilding(data) {
  return request({
    url: '/crm-political/building',
    method: 'put',
    data: data
  })
}

// 删除教学楼
export function delBuilding(id) {
  return request({
    url: '/crm-political/building/' + id,
    method: 'delete'
  })
}
