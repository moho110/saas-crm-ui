import request from '@/utils/request'

// 查询仓库管理入库明细颜色列表
export function listIncolor(query) {
  return request({
    url: '/crm-store/incolor/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理入库明细颜色详细
export function getIncolor(id) {
  return request({
    url: '/crm-store/incolor/' + id,
    method: 'get'
  })
}

// 新增仓库管理入库明细颜色
export function addIncolor(data) {
  return request({
    url: '/crm-store/incolor',
    method: 'post',
    data: data
  })
}

// 修改仓库管理入库明细颜色
export function updateIncolor(data) {
  return request({
    url: '/crm-store/incolor',
    method: 'put',
    data: data
  })
}

// 删除仓库管理入库明细颜色
export function delIncolor(id) {
  return request({
    url: '/crm-store/incolor/' + id,
    method: 'delete'
  })
}
