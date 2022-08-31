import request from '@/utils/request'

// 查询认证列表
export function listCertificate(query) {
  return request({
    url: '/crm-basicdata/certificate/list',
    method: 'get',
    params: query
  })
}

// 查询认证详细
export function getCertificate(id) {
  return request({
    url: '/crm-basicdata/certificate/' + id,
    method: 'get'
  })
}

// 新增认证
export function addCertificate(data) {
  return request({
    url: '/crm-basicdata/certificate',
    method: 'post',
    data: data
  })
}

// 修改认证
export function updateCertificate(data) {
  return request({
    url: '/crm-basicdata/certificate',
    method: 'put',
    data: data
  })
}

// 删除认证
export function delCertificate(id) {
  return request({
    url: '/crm-basicdata/certificate/' + id,
    method: 'delete'
  })
}
