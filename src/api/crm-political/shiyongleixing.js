import request from '@/utils/request'

// 查询使用类型列表
export function listShiyongleixing(query) {
  return request({
    url: '/crm-political/shiyongleixing/list',
    method: 'get',
    params: query
  })
}

// 查询使用类型详细
export function getShiyongleixing(id) {
  return request({
    url: '/crm-political/shiyongleixing/' + id,
    method: 'get'
  })
}

// 新增使用类型
export function addShiyongleixing(data) {
  return request({
    url: '/crm-political/shiyongleixing',
    method: 'post',
    data: data
  })
}

// 修改使用类型
export function updateShiyongleixing(data) {
  return request({
    url: '/crm-political/shiyongleixing',
    method: 'put',
    data: data
  })
}

// 删除使用类型
export function delShiyongleixing(id) {
  return request({
    url: '/crm-political/shiyongleixing/' + id,
    method: 'delete'
  })
}
