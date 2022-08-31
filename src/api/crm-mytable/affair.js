import request from '@/utils/request'

// 查询事务列表
export function listAffair(query) {
  return request({
    url: '/crm-mytable/affair/list',
    method: 'get',
    params: query
  })
}

// 查询事务详细
export function getAffair(id) {
  return request({
    url: '/crm-mytable/affair/' + id,
    method: 'get'
  })
}

// 新增事务
export function addAffair(data) {
  return request({
    url: '/crm-mytable/affair',
    method: 'post',
    data: data
  })
}

// 修改事务
export function updateAffair(data) {
  return request({
    url: '/crm-mytable/affair',
    method: 'put',
    data: data
  })
}

// 删除事务
export function delAffair(id) {
  return request({
    url: '/crm-mytable/affair/' + id,
    method: 'delete'
  })
}
