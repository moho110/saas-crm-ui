import request from '@/utils/request'

// 查询联系人列表
export function listLinkman(query) {
  return request({
    url: '/crm-basicdata/linkman/list',
    method: 'get',
    params: query
  })
}

// 查询联系人详细
export function getLinkman(id) {
  return request({
    url: '/crm-basicdata/linkman/' + id,
    method: 'get'
  })
}

// 新增联系人
export function addLinkman(data) {
  return request({
    url: '/crm-basicdata/linkman',
    method: 'post',
    data: data
  })
}

// 修改联系人
export function updateLinkman(data) {
  return request({
    url: '/crm-basicdata/linkman',
    method: 'put',
    data: data
  })
}

// 删除联系人
export function delLinkman(id) {
  return request({
    url: '/crm-basicdata/linkman/' + id,
    method: 'delete'
  })
}
