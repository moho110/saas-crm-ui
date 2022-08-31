import request from '@/utils/request'

// 查询费用分类列表
export function listFeiyongclasse(query) {
  return request({
    url: '/crm-basicdata/feiyongclasse/list',
    method: 'get',
    params: query
  })
}

// 查询费用分类详细
export function getFeiyongclasse(id) {
  return request({
    url: '/crm-basicdata/feiyongclasse/' + id,
    method: 'get'
  })
}

// 新增费用分类
export function addFeiyongclasse(data) {
  return request({
    url: '/crm-basicdata/feiyongclasse',
    method: 'post',
    data: data
  })
}

// 修改费用分类
export function updateFeiyongclasse(data) {
  return request({
    url: '/crm-basicdata/feiyongclasse',
    method: 'put',
    data: data
  })
}

// 删除费用分类
export function delFeiyongclasse(id) {
  return request({
    url: '/crm-basicdata/feiyongclasse/' + id,
    method: 'delete'
  })
}
