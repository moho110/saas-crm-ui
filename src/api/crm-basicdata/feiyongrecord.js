import request from '@/utils/request'

// 查询费用记录列表
export function listFeiyongrecord(query) {
  return request({
    url: '/crm-basicdata/feiyongrecord/list',
    method: 'get',
    params: query
  })
}

// 查询费用记录详细
export function getFeiyongrecord(id) {
  return request({
    url: '/crm-basicdata/feiyongrecord/' + id,
    method: 'get'
  })
}

// 新增费用记录
export function addFeiyongrecord(data) {
  return request({
    url: '/crm-basicdata/feiyongrecord',
    method: 'post',
    data: data
  })
}

// 修改费用记录
export function updateFeiyongrecord(data) {
  return request({
    url: '/crm-basicdata/feiyongrecord',
    method: 'put',
    data: data
  })
}

// 删除费用记录
export function delFeiyongrecord(id) {
  return request({
    url: '/crm-basicdata/feiyongrecord/' + id,
    method: 'delete'
  })
}
