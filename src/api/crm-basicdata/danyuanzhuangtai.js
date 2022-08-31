import request from '@/utils/request'

// 查询单元状态列表
export function listDanyuanzhuangtai(query) {
  return request({
    url: '/crm-basicdata/danyuanzhuangtai/list',
    method: 'get',
    params: query
  })
}

// 查询单元状态详细
export function getDanyuanzhuangtai(id) {
  return request({
    url: '/crm-basicdata/danyuanzhuangtai/' + id,
    method: 'get'
  })
}

// 新增单元状态
export function addDanyuanzhuangtai(data) {
  return request({
    url: '/crm-basicdata/danyuanzhuangtai',
    method: 'post',
    data: data
  })
}

// 修改单元状态
export function updateDanyuanzhuangtai(data) {
  return request({
    url: '/crm-basicdata/danyuanzhuangtai',
    method: 'put',
    data: data
  })
}

// 删除单元状态
export function delDanyuanzhuangtai(id) {
  return request({
    url: '/crm-basicdata/danyuanzhuangtai/' + id,
    method: 'delete'
  })
}
