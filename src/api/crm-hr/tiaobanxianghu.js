import request from '@/utils/request'

// 查询行政调班项目列表
export function listTiaobanxianghu(query) {
  return request({
    url: '/crm-hr/tiaobanxianghu/list',
    method: 'get',
    params: query
  })
}

// 查询行政调班项目详细
export function getTiaobanxianghu(id) {
  return request({
    url: '/crm-hr/tiaobanxianghu/' + id,
    method: 'get'
  })
}

// 新增行政调班项目
export function addTiaobanxianghu(data) {
  return request({
    url: '/crm-hr/tiaobanxianghu',
    method: 'post',
    data: data
  })
}

// 修改行政调班项目
export function updateTiaobanxianghu(data) {
  return request({
    url: '/crm-hr/tiaobanxianghu',
    method: 'put',
    data: data
  })
}

// 删除行政调班项目
export function delTiaobanxianghu(id) {
  return request({
    url: '/crm-hr/tiaobanxianghu/' + id,
    method: 'delete'
  })
}
