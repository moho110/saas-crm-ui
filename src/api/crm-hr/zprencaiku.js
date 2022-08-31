import request from '@/utils/request'

// 查询招聘人才库列表
export function listZprencaiku(query) {
  return request({
    url: '/crm-hr/zprencaiku/list',
    method: 'get',
    params: query
  })
}

// 查询招聘人才库详细
export function getZprencaiku(id) {
  return request({
    url: '/crm-hr/zprencaiku/' + id,
    method: 'get'
  })
}

// 新增招聘人才库
export function addZprencaiku(data) {
  return request({
    url: '/crm-hr/zprencaiku',
    method: 'post',
    data: data
  })
}

// 修改招聘人才库
export function updateZprencaiku(data) {
  return request({
    url: '/crm-hr/zprencaiku',
    method: 'put',
    data: data
  })
}

// 删除招聘人才库
export function delZprencaiku(id) {
  return request({
    url: '/crm-hr/zprencaiku/' + id,
    method: 'delete'
  })
}
