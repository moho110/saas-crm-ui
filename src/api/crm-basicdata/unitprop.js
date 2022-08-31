import request from '@/utils/request'

// 查询单位属性列表
export function listUnitprop(query) {
  return request({
    url: '/crm-basicdata/unitprop/list',
    method: 'get',
    params: query
  })
}

// 查询单位属性详细
export function getUnitprop(id) {
  return request({
    url: '/crm-basicdata/unitprop/' + id,
    method: 'get'
  })
}

// 新增单位属性
export function addUnitprop(data) {
  return request({
    url: '/crm-basicdata/unitprop',
    method: 'post',
    data: data
  })
}

// 修改单位属性
export function updateUnitprop(data) {
  return request({
    url: '/crm-basicdata/unitprop',
    method: 'put',
    data: data
  })
}

// 删除单位属性
export function delUnitprop(id) {
  return request({
    url: '/crm-basicdata/unitprop/' + id,
    method: 'delete'
  })
}
