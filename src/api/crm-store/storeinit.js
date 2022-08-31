import request from '@/utils/request'

// 查询库存初始化列表
export function listStoreinit(query) {
  return request({
    url: '/crm-store/storeinit/list',
    method: 'get',
    params: query
  })
}

// 查询库存初始化详细
export function getStoreinit(id) {
  return request({
    url: '/crm-store/storeinit/' + id,
    method: 'get'
  })
}

// 新增库存初始化
export function addStoreinit(data) {
  return request({
    url: '/crm-store/storeinit',
    method: 'post',
    data: data
  })
}

// 修改库存初始化
export function updateStoreinit(data) {
  return request({
    url: '/crm-store/storeinit',
    method: 'put',
    data: data
  })
}

// 删除库存初始化
export function delStoreinit(id) {
  return request({
    url: '/crm-store/storeinit/' + id,
    method: 'delete'
  })
}
