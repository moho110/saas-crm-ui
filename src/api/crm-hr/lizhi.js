import request from '@/utils/request'

// 查询人员离职列表
export function listLizhi(query) {
  return request({
    url: '/crm-hr/lizhi/list',
    method: 'get',
    params: query
  })
}

// 查询人员离职详细
export function getLizhi(id) {
  return request({
    url: '/crm-hr/lizhi/' + id,
    method: 'get'
  })
}

// 新增人员离职
export function addLizhi(data) {
  return request({
    url: '/crm-hr/lizhi',
    method: 'post',
    data: data
  })
}

// 修改人员离职
export function updateLizhi(data) {
  return request({
    url: '/crm-hr/lizhi',
    method: 'put',
    data: data
  })
}

// 删除人员离职
export function delLizhi(id) {
  return request({
    url: '/crm-hr/lizhi/' + id,
    method: 'delete'
  })
}
