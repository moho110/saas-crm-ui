import request from '@/utils/request'

// 查询是否教育列表
export function listBoolean(query) {
  return request({
    url: '/crm-hr/boolean/list',
    method: 'get',
    params: query
  })
}

// 查询是否教育详细
export function getBoolean(id) {
  return request({
    url: '/crm-hr/boolean/' + id,
    method: 'get'
  })
}

// 新增是否教育
export function addBoolean(data) {
  return request({
    url: '/crm-hr/boolean',
    method: 'post',
    data: data
  })
}

// 修改是否教育
export function updateBoolean(data) {
  return request({
    url: '/crm-hr/boolean',
    method: 'put',
    data: data
  })
}

// 删除是否教育
export function delBoolean(id) {
  return request({
    url: '/crm-hr/boolean/' + id,
    method: 'delete'
  })
}
