import request from '@/utils/request'

// 查询短信发送清单列表
export function listSendlist(query) {
  return request({
    url: '/crm-mytable/sendlist/list',
    method: 'get',
    params: query
  })
}

// 查询短信发送清单详细
export function getSendlist(id) {
  return request({
    url: '/crm-mytable/sendlist/' + id,
    method: 'get'
  })
}

// 新增短信发送清单
export function addSendlist(data) {
  return request({
    url: '/crm-mytable/sendlist',
    method: 'post',
    data: data
  })
}

// 修改短信发送清单
export function updateSendlist(data) {
  return request({
    url: '/crm-mytable/sendlist',
    method: 'put',
    data: data
  })
}

// 删除短信发送清单
export function delSendlist(id) {
  return request({
    url: '/crm-mytable/sendlist/' + id,
    method: 'delete'
  })
}
