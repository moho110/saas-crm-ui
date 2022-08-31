import request from '@/utils/request'

// 查询状态列表
export function listZhuangtai(query) {
  return request({
    url: '/crm-customer/zhuangtai/list',
    method: 'get',
    params: query
  })
}

// 查询状态详细
export function getZhuangtai(id) {
  return request({
    url: '/crm-customer/zhuangtai/' + id,
    method: 'get'
  })
}

// 新增状态
export function addZhuangtai(data) {
  return request({
    url: '/crm-customer/zhuangtai',
    method: 'post',
    data: data
  })
}

// 修改状态
export function updateZhuangtai(data) {
  return request({
    url: '/crm-customer/zhuangtai',
    method: 'put',
    data: data
  })
}

// 删除状态
export function delZhuangtai(id) {
  return request({
    url: '/crm-customer/zhuangtai/' + id,
    method: 'delete'
  })
}
