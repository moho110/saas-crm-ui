import request from '@/utils/request'

// 查询申请报备列表
export function listShenqingbaobei(query) {
  return request({
    url: '/crm-customer/shenqingbaobei/list',
    method: 'get',
    params: query
  })
}

// 查询申请报备详细
export function getShenqingbaobei(id) {
  return request({
    url: '/crm-customer/shenqingbaobei/' + id,
    method: 'get'
  })
}

// 新增申请报备
export function addShenqingbaobei(data) {
  return request({
    url: '/crm-customer/shenqingbaobei',
    method: 'post',
    data: data
  })
}

// 修改申请报备
export function updateShenqingbaobei(data) {
  return request({
    url: '/crm-customer/shenqingbaobei',
    method: 'put',
    data: data
  })
}

// 删除申请报备
export function delShenqingbaobei(id) {
  return request({
    url: '/crm-customer/shenqingbaobei/' + id,
    method: 'delete'
  })
}
