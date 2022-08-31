import request from '@/utils/request'

// 查询国家代码列表
export function listCountrycode(query) {
  return request({
    url: '/crm-basicdata/countrycode/list',
    method: 'get',
    params: query
  })
}

// 查询国家代码详细
export function getCountrycode(id) {
  return request({
    url: '/crm-basicdata/countrycode/' + id,
    method: 'get'
  })
}

// 新增国家代码
export function addCountrycode(data) {
  return request({
    url: '/crm-basicdata/countrycode',
    method: 'post',
    data: data
  })
}

// 修改国家代码
export function updateCountrycode(data) {
  return request({
    url: '/crm-basicdata/countrycode',
    method: 'put',
    data: data
  })
}

// 删除国家代码
export function delCountrycode(id) {
  return request({
    url: '/crm-basicdata/countrycode/' + id,
    method: 'delete'
  })
}
