import request from '@/utils/request'

// 查询供应商等级列表
export function listSupplylever(query) {
  return request({
    url: '/crm-basicdata/supplylever/list',
    method: 'get',
    params: query
  })
}

// 查询供应商等级详细
export function getSupplylever(id) {
  return request({
    url: '/crm-basicdata/supplylever/' + id,
    method: 'get'
  })
}

// 新增供应商等级
export function addSupplylever(data) {
  return request({
    url: '/crm-basicdata/supplylever',
    method: 'post',
    data: data
  })
}

// 修改供应商等级
export function updateSupplylever(data) {
  return request({
    url: '/crm-basicdata/supplylever',
    method: 'put',
    data: data
  })
}

// 删除供应商等级
export function delSupplylever(id) {
  return request({
    url: '/crm-basicdata/supplylever/' + id,
    method: 'delete'
  })
}
