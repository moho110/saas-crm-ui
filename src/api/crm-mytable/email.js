import request from '@/utils/request'

// 查询发送邮件列表
export function listEmail(query) {
  return request({
    url: '/crm-mytable/email/list',
    method: 'get',
    params: query
  })
}

// 查询发送邮件详细
export function getEmail(id) {
  return request({
    url: '/crm-mytable/email/' + id,
    method: 'get'
  })
}

// 新增发送邮件
export function addEmail(data) {
  return request({
    url: '/crm-mytable/email',
    method: 'post',
    data: data
  })
}

// 修改发送邮件
export function updateEmail(data) {
  return request({
    url: '/crm-mytable/email',
    method: 'put',
    data: data
  })
}

// 删除发送邮件
export function delEmail(id) {
  return request({
    url: '/crm-mytable/email/' + id,
    method: 'delete'
  })
}
