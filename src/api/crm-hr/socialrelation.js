import request from '@/utils/request'

// 查询社会关系列表
export function listSocialrelation(query) {
  return request({
    url: '/crm-hr/socialrelation/list',
    method: 'get',
    params: query
  })
}

// 查询社会关系详细
export function getSocialrelation(id) {
  return request({
    url: '/crm-hr/socialrelation/' + id,
    method: 'get'
  })
}

// 新增社会关系
export function addSocialrelation(data) {
  return request({
    url: '/crm-hr/socialrelation',
    method: 'post',
    data: data
  })
}

// 修改社会关系
export function updateSocialrelation(data) {
  return request({
    url: '/crm-hr/socialrelation',
    method: 'put',
    data: data
  })
}

// 删除社会关系
export function delSocialrelation(id) {
  return request({
    url: '/crm-hr/socialrelation/' + id,
    method: 'delete'
  })
}
