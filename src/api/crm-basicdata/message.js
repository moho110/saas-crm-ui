import request from '@/utils/request'

// 查询消息明细列表
export function listMessage(query) {
  return request({
    url: '/crm-basicdata/message/list',
    method: 'get',
    params: query
  })
}

// 查询消息明细详细
export function getMessage(id) {
  return request({
    url: '/crm-basicdata/message/' + id,
    method: 'get'
  })
}

// 新增消息明细
export function addMessage(data) {
  return request({
    url: '/crm-basicdata/message',
    method: 'post',
    data: data
  })
}

// 修改消息明细
export function updateMessage(data) {
  return request({
    url: '/crm-basicdata/message',
    method: 'put',
    data: data
  })
}

// 删除消息明细
export function delMessage(id) {
  return request({
    url: '/crm-basicdata/message/' + id,
    method: 'delete'
  })
}
