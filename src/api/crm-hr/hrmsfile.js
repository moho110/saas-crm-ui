import request from '@/utils/request'

// 查询人事档案列表
export function listHrmsfile(query) {
  return request({
    url: '/crm-hr/hrmsfile/list',
    method: 'get',
    params: query
  })
}

// 查询人事档案详细
export function getHrmsfile(id) {
  return request({
    url: '/crm-hr/hrmsfile/' + id,
    method: 'get'
  })
}

// 新增人事档案
export function addHrmsfile(data) {
  return request({
    url: '/crm-hr/hrmsfile',
    method: 'post',
    data: data
  })
}

// 修改人事档案
export function updateHrmsfile(data) {
  return request({
    url: '/crm-hr/hrmsfile',
    method: 'put',
    data: data
  })
}

// 删除人事档案
export function delHrmsfile(id) {
  return request({
    url: '/crm-hr/hrmsfile/' + id,
    method: 'delete'
  })
}
