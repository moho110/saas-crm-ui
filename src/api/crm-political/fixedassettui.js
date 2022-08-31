import request from '@/utils/request'

// 查询固定资产归还列表
export function listFixedassettui(query) {
  return request({
    url: '/crm-political/fixedassettui/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产归还详细
export function getFixedassettui(id) {
  return request({
    url: '/crm-political/fixedassettui/' + id,
    method: 'get'
  })
}

// 新增固定资产归还
export function addFixedassettui(data) {
  return request({
    url: '/crm-political/fixedassettui',
    method: 'post',
    data: data
  })
}

// 修改固定资产归还
export function updateFixedassettui(data) {
  return request({
    url: '/crm-political/fixedassettui',
    method: 'put',
    data: data
  })
}

// 删除固定资产归还
export function delFixedassettui(id) {
  return request({
    url: '/crm-political/fixedassettui/' + id,
    method: 'delete'
  })
}
