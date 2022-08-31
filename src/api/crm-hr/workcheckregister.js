import request from '@/utils/request'

// 查询行政人员工作考核登记表列表
export function listWorkcheckregister(query) {
  return request({
    url: '/crm-hr/workcheckregister/list',
    method: 'get',
    params: query
  })
}

// 查询行政人员工作考核登记表详细
export function getWorkcheckregister(id) {
  return request({
    url: '/crm-hr/workcheckregister/' + id,
    method: 'get'
  })
}

// 新增行政人员工作考核登记表
export function addWorkcheckregister(data) {
  return request({
    url: '/crm-hr/workcheckregister',
    method: 'post',
    data: data
  })
}

// 修改行政人员工作考核登记表
export function updateWorkcheckregister(data) {
  return request({
    url: '/crm-hr/workcheckregister',
    method: 'put',
    data: data
  })
}

// 删除行政人员工作考核登记表
export function delWorkcheckregister(id) {
  return request({
    url: '/crm-hr/workcheckregister/' + id,
    method: 'delete'
  })
}
