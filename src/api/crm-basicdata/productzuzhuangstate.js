import request from '@/utils/request'

// 查询产品组装状态列表
export function listProductzuzhuangstate(query) {
  return request({
    url: '/crm-basicdata/productzuzhuangstate/list',
    method: 'get',
    params: query
  })
}

// 查询产品组装状态详细
export function getProductzuzhuangstate(id) {
  return request({
    url: '/crm-basicdata/productzuzhuangstate/' + id,
    method: 'get'
  })
}

// 新增产品组装状态
export function addProductzuzhuangstate(data) {
  return request({
    url: '/crm-basicdata/productzuzhuangstate',
    method: 'post',
    data: data
  })
}

// 修改产品组装状态
export function updateProductzuzhuangstate(data) {
  return request({
    url: '/crm-basicdata/productzuzhuangstate',
    method: 'put',
    data: data
  })
}

// 删除产品组装状态
export function delProductzuzhuangstate(id) {
  return request({
    url: '/crm-basicdata/productzuzhuangstate/' + id,
    method: 'delete'
  })
}
