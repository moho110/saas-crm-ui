import request from '@/utils/request'

// 查询仓库出库明细列表
export function listOutdetail(query) {
  return request({
    url: '/crm-store/outdetail/list',
    method: 'get',
    params: query
  })
}

// 查询仓库出库明细详细
export function getOutdetail(id) {
  return request({
    url: '/crm-store/outdetail/' + id,
    method: 'get'
  })
}

// 新增仓库出库明细
export function addOutdetail(data) {
  return request({
    url: '/crm-store/outdetail',
    method: 'post',
    data: data
  })
}

// 修改仓库出库明细
export function updateOutdetail(data) {
  return request({
    url: '/crm-store/outdetail',
    method: 'put',
    data: data
  })
}

// 删除仓库出库明细
export function delOutdetail(id) {
  return request({
    url: '/crm-store/outdetail/' + id,
    method: 'delete'
  })
}
