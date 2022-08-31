import request from '@/utils/request'

// 查询显示属性列表
export function listMytablexssx(query) {
  return request({
    url: '/crm-mytable/mytablexssx/list',
    method: 'get',
    params: query
  })
}

// 查询显示属性详细
export function getMytablexssx(id) {
  return request({
    url: '/crm-mytable/mytablexssx/' + id,
    method: 'get'
  })
}

// 新增显示属性
export function addMytablexssx(data) {
  return request({
    url: '/crm-mytable/mytablexssx',
    method: 'post',
    data: data
  })
}

// 修改显示属性
export function updateMytablexssx(data) {
  return request({
    url: '/crm-mytable/mytablexssx',
    method: 'put',
    data: data
  })
}

// 删除显示属性
export function delMytablexssx(id) {
  return request({
    url: '/crm-mytable/mytablexssx/' + id,
    method: 'delete'
  })
}
