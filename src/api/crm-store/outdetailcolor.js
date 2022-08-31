import request from '@/utils/request'

// 查询仓库出库明细颜色列表
export function listOutdetailcolor(query) {
  return request({
    url: '/crm-store/outdetailcolor/list',
    method: 'get',
    params: query
  })
}

// 查询仓库出库明细颜色详细
export function getOutdetailcolor(id) {
  return request({
    url: '/crm-store/outdetailcolor/' + id,
    method: 'get'
  })
}

// 新增仓库出库明细颜色
export function addOutdetailcolor(data) {
  return request({
    url: '/crm-store/outdetailcolor',
    method: 'post',
    data: data
  })
}

// 修改仓库出库明细颜色
export function updateOutdetailcolor(data) {
  return request({
    url: '/crm-store/outdetailcolor',
    method: 'put',
    data: data
  })
}

// 删除仓库出库明细颜色
export function delOutdetailcolor(id) {
  return request({
    url: '/crm-store/outdetailcolor/' + id,
    method: 'delete'
  })
}
