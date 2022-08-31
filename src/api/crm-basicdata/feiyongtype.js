import request from '@/utils/request'

// 查询费用类型列表
export function listFeiyongtype(query) {
  return request({
    url: '/crm-basicdata/feiyongtype/list',
    method: 'get',
    params: query
  })
}

// 查询费用类型详细
export function getFeiyongtype(id) {
  return request({
    url: '/crm-basicdata/feiyongtype/' + id,
    method: 'get'
  })
}

// 新增费用类型
export function addFeiyongtype(data) {
  return request({
    url: '/crm-basicdata/feiyongtype',
    method: 'post',
    data: data
  })
}

// 修改费用类型
export function updateFeiyongtype(data) {
  return request({
    url: '/crm-basicdata/feiyongtype',
    method: 'put',
    data: data
  })
}

// 删除费用类型
export function delFeiyongtype(id) {
  return request({
    url: '/crm-basicdata/feiyongtype/' + id,
    method: 'delete'
  })
}
