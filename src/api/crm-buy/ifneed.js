import request from '@/utils/request'

// 查询是否需求列表
export function listIfneed(query) {
  return request({
    url: '/crm-buy/ifneed/list',
    method: 'get',
    params: query
  })
}

// 查询是否需求详细
export function getIfneed(id) {
  return request({
    url: '/crm-buy/ifneed/' + id,
    method: 'get'
  })
}

// 新增是否需求
export function addIfneed(data) {
  return request({
    url: '/crm-buy/ifneed',
    method: 'post',
    data: data
  })
}

// 修改是否需求
export function updateIfneed(data) {
  return request({
    url: '/crm-buy/ifneed',
    method: 'put',
    data: data
  })
}

// 删除是否需求
export function delIfneed(id) {
  return request({
    url: '/crm-buy/ifneed/' + id,
    method: 'delete'
  })
}
