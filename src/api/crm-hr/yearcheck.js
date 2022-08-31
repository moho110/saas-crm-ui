import request from '@/utils/request'

// 查询行政人员年度考核量化表列表
export function listYearcheck(query) {
  return request({
    url: '/crm-hr/yearcheck/list',
    method: 'get',
    params: query
  })
}

// 查询行政人员年度考核量化表详细
export function getYearcheck(id) {
  return request({
    url: '/crm-hr/yearcheck/' + id,
    method: 'get'
  })
}

// 新增行政人员年度考核量化表
export function addYearcheck(data) {
  return request({
    url: '/crm-hr/yearcheck',
    method: 'post',
    data: data
  })
}

// 修改行政人员年度考核量化表
export function updateYearcheck(data) {
  return request({
    url: '/crm-hr/yearcheck',
    method: 'put',
    data: data
  })
}

// 删除行政人员年度考核量化表
export function delYearcheck(id) {
  return request({
    url: '/crm-hr/yearcheck/' + id,
    method: 'delete'
  })
}
