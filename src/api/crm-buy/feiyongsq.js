import request from '@/utils/request'

// 查询费用申请列表
export function listFeiyongsq(query) {
  return request({
    url: '/crm-buy/feiyongsq/list',
    method: 'get',
    params: query
  })
}

// 查询费用申请详细
export function getFeiyongsq(id) {
  return request({
    url: '/crm-buy/feiyongsq/' + id,
    method: 'get'
  })
}

// 新增费用申请
export function addFeiyongsq(data) {
  return request({
    url: '/crm-buy/feiyongsq',
    method: 'post',
    data: data
  })
}

// 修改费用申请
export function updateFeiyongsq(data) {
  return request({
    url: '/crm-buy/feiyongsq',
    method: 'put',
    data: data
  })
}

// 删除费用申请
export function delFeiyongsq(id) {
  return request({
    url: '/crm-buy/feiyongsq/' + id,
    method: 'delete'
  })
}
