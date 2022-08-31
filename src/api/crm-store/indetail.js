import request from '@/utils/request'

// 查询仓库管理入库明细列表
export function listIndetail(query) {
  return request({
    url: '/crm-store/indetail/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理入库明细详细
export function getIndetail(id) {
  return request({
    url: '/crm-store/indetail/' + id,
    method: 'get'
  })
}

// 新增仓库管理入库明细
export function addIndetail(data) {
  return request({
    url: '/crm-store/indetail',
    method: 'post',
    data: data
  })
}

// 修改仓库管理入库明细
export function updateIndetail(data) {
  return request({
    url: '/crm-store/indetail',
    method: 'put',
    data: data
  })
}

// 删除仓库管理入库明细
export function delIndetail(id) {
  return request({
    url: '/crm-store/indetail/' + id,
    method: 'delete'
  })
}
