import request from '@/utils/request'

// 查询固定资产调库列表
export function listFixedassettiaoku(query) {
  return request({
    url: '/crm-political/fixedassettiaoku/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产调库详细
export function getFixedassettiaoku(id) {
  return request({
    url: '/crm-political/fixedassettiaoku/' + id,
    method: 'get'
  })
}

// 新增固定资产调库
export function addFixedassettiaoku(data) {
  return request({
    url: '/crm-political/fixedassettiaoku',
    method: 'post',
    data: data
  })
}

// 修改固定资产调库
export function updateFixedassettiaoku(data) {
  return request({
    url: '/crm-political/fixedassettiaoku',
    method: 'put',
    data: data
  })
}

// 删除固定资产调库
export function delFixedassettiaoku(id) {
  return request({
    url: '/crm-political/fixedassettiaoku/' + id,
    method: 'delete'
  })
}
