import request from '@/utils/request'

// 查询仓库管理入库列表
export function listStockinmain(query) {
  return request({
    url: '/crm-store/stockinmain/list',
    method: 'get',
    params: query
  })
}

// 查询仓库管理入库详细
export function getStockinmain(id) {
  return request({
    url: '/crm-store/stockinmain/' + id,
    method: 'get'
  })
}

// 新增仓库管理入库
export function addStockinmain(data) {
  return request({
    url: '/crm-store/stockinmain',
    method: 'post',
    data: data
  })
}

// 修改仓库管理入库
export function updateStockinmain(data) {
  return request({
    url: '/crm-store/stockinmain',
    method: 'put',
    data: data
  })
}

// 删除仓库管理入库
export function delStockinmain(id) {
  return request({
    url: '/crm-store/stockinmain/' + id,
    method: 'delete'
  })
}
