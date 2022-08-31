import request from '@/utils/request'

// 查询来电处理列表
export function listCallchuli(query) {
  return request({
    url: '/crm-mytable/callchuli/list',
    method: 'get',
    params: query
  })
}

// 查询来电处理详细
export function getCallchuli(id) {
  return request({
    url: '/crm-mytable/callchuli/' + id,
    method: 'get'
  })
}

// 新增来电处理
export function addCallchuli(data) {
  return request({
    url: '/crm-mytable/callchuli',
    method: 'post',
    data: data
  })
}

// 修改来电处理
export function updateCallchuli(data) {
  return request({
    url: '/crm-mytable/callchuli',
    method: 'put',
    data: data
  })
}

// 删除来电处理
export function delCallchuli(id) {
  return request({
    url: '/crm-mytable/callchuli/' + id,
    method: 'delete'
  })
}
