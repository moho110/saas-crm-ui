import request from '@/utils/request'

// 查询满意度列表
export function listSatisfaction(query) {
  return request({
    url: '/crm-political/satisfaction/list',
    method: 'get',
    params: query
  })
}

// 查询满意度详细
export function getSatisfaction(id) {
  return request({
    url: '/crm-political/satisfaction/' + id,
    method: 'get'
  })
}

// 新增满意度
export function addSatisfaction(data) {
  return request({
    url: '/crm-political/satisfaction',
    method: 'post',
    data: data
  })
}

// 修改满意度
export function updateSatisfaction(data) {
  return request({
    url: '/crm-political/satisfaction',
    method: 'put',
    data: data
  })
}

// 删除满意度
export function delSatisfaction(id) {
  return request({
    url: '/crm-political/satisfaction/' + id,
    method: 'delete'
  })
}
