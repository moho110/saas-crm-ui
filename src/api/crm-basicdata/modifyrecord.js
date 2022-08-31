import request from '@/utils/request'

// 查询修改记录列表
export function listModifyrecord(query) {
  return request({
    url: '/crm-basicdata/modifyrecord/list',
    method: 'get',
    params: query
  })
}

// 查询修改记录详细
export function getModifyrecord(id) {
  return request({
    url: '/crm-basicdata/modifyrecord/' + id,
    method: 'get'
  })
}

// 新增修改记录
export function addModifyrecord(data) {
  return request({
    url: '/crm-basicdata/modifyrecord',
    method: 'post',
    data: data
  })
}

// 修改修改记录
export function updateModifyrecord(data) {
  return request({
    url: '/crm-basicdata/modifyrecord',
    method: 'put',
    data: data
  })
}

// 删除修改记录
export function delModifyrecord(id) {
  return request({
    url: '/crm-basicdata/modifyrecord/' + id,
    method: 'delete'
  })
}
