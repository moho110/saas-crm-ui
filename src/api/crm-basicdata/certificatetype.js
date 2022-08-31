import request from '@/utils/request'

// 查询认证类型列表
export function listCertificatetype(query) {
  return request({
    url: '/crm-basicdata/certificatetype/list',
    method: 'get',
    params: query
  })
}

// 查询认证类型详细
export function getCertificatetype(id) {
  return request({
    url: '/crm-basicdata/certificatetype/' + id,
    method: 'get'
  })
}

// 新增认证类型
export function addCertificatetype(data) {
  return request({
    url: '/crm-basicdata/certificatetype',
    method: 'post',
    data: data
  })
}

// 修改认证类型
export function updateCertificatetype(data) {
  return request({
    url: '/crm-basicdata/certificatetype',
    method: 'put',
    data: data
  })
}

// 删除认证类型
export function delCertificatetype(id) {
  return request({
    url: '/crm-basicdata/certificatetype/' + id,
    method: 'delete'
  })
}
