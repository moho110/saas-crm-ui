import request from '@/utils/request'

// 查询办公用品归还状态列表
export function listOfficeguihuanstate(query) {
  return request({
    url: '/crm-political/officeguihuanstate/list',
    method: 'get',
    params: query
  })
}

// 查询办公用品归还状态详细
export function getOfficeguihuanstate(id) {
  return request({
    url: '/crm-political/officeguihuanstate/' + id,
    method: 'get'
  })
}

// 新增办公用品归还状态
export function addOfficeguihuanstate(data) {
  return request({
    url: '/crm-political/officeguihuanstate',
    method: 'post',
    data: data
  })
}

// 修改办公用品归还状态
export function updateOfficeguihuanstate(data) {
  return request({
    url: '/crm-political/officeguihuanstate',
    method: 'put',
    data: data
  })
}

// 删除办公用品归还状态
export function delOfficeguihuanstate(id) {
  return request({
    url: '/crm-political/officeguihuanstate/' + id,
    method: 'delete'
  })
}
