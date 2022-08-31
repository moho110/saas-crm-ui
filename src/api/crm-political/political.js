import request from '@/utils/request'

// 查询政治面貌列表
export function listPolitical(query) {
  return request({
    url: '/crm-political/political/list',
    method: 'get',
    params: query
  })
}

// 查询政治面貌详细
export function getPolitical(id) {
  return request({
    url: '/crm-political/political/' + id,
    method: 'get'
  })
}

// 新增政治面貌
export function addPolitical(data) {
  return request({
    url: '/crm-political/political',
    method: 'post',
    data: data
  })
}

// 修改政治面貌
export function updatePolitical(data) {
  return request({
    url: '/crm-political/political',
    method: 'put',
    data: data
  })
}

// 删除政治面貌
export function delPolitical(id) {
  return request({
    url: '/crm-political/political/' + id,
    method: 'delete'
  })
}
