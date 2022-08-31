import request from '@/utils/request'

// 查询单元用途列表
export function listDanyuanyongtu(query) {
  return request({
    url: '/crm-basicdata/danyuanyongtu/list',
    method: 'get',
    params: query
  })
}

// 查询单元用途详细
export function getDanyuanyongtu(id) {
  return request({
    url: '/crm-basicdata/danyuanyongtu/' + id,
    method: 'get'
  })
}

// 新增单元用途
export function addDanyuanyongtu(data) {
  return request({
    url: '/crm-basicdata/danyuanyongtu',
    method: 'post',
    data: data
  })
}

// 修改单元用途
export function updateDanyuanyongtu(data) {
  return request({
    url: '/crm-basicdata/danyuanyongtu',
    method: 'put',
    data: data
  })
}

// 删除单元用途
export function delDanyuanyongtu(id) {
  return request({
    url: '/crm-basicdata/danyuanyongtu/' + id,
    method: 'delete'
  })
}
