import request from '@/utils/request'

// 查询邮件状态列表
export function listEmailstate(query) {
  return request({
    url: '/crm-mytable/emailstate/list',
    method: 'get',
    params: query
  })
}

// 查询邮件状态详细
export function getEmailstate(id) {
  return request({
    url: '/crm-mytable/emailstate/' + id,
    method: 'get'
  })
}

// 新增邮件状态
export function addEmailstate(data) {
  return request({
    url: '/crm-mytable/emailstate',
    method: 'post',
    data: data
  })
}

// 修改邮件状态
export function updateEmailstate(data) {
  return request({
    url: '/crm-mytable/emailstate',
    method: 'put',
    data: data
  })
}

// 删除邮件状态
export function delEmailstate(id) {
  return request({
    url: '/crm-mytable/emailstate/' + id,
    method: 'delete'
  })
}
