import request from '@/utils/request'

// 查询行政加班补休列表
export function listJiabanbuxiu(query) {
  return request({
    url: '/crm-hr/jiabanbuxiu/list',
    method: 'get',
    params: query
  })
}

// 查询行政加班补休详细
export function getJiabanbuxiu(id) {
  return request({
    url: '/crm-hr/jiabanbuxiu/' + id,
    method: 'get'
  })
}

// 新增行政加班补休
export function addJiabanbuxiu(data) {
  return request({
    url: '/crm-hr/jiabanbuxiu',
    method: 'post',
    data: data
  })
}

// 修改行政加班补休
export function updateJiabanbuxiu(data) {
  return request({
    url: '/crm-hr/jiabanbuxiu',
    method: 'put',
    data: data
  })
}

// 删除行政加班补休
export function delJiabanbuxiu(id) {
  return request({
    url: '/crm-hr/jiabanbuxiu/' + id,
    method: 'delete'
  })
}
