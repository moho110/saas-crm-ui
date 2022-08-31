import request from '@/utils/request'

// 查询人员技能列表
export function listLaboringskill(query) {
  return request({
    url: '/crm-hr/laboringskill/list',
    method: 'get',
    params: query
  })
}

// 查询人员技能详细
export function getLaboringskill(id) {
  return request({
    url: '/crm-hr/laboringskill/' + id,
    method: 'get'
  })
}

// 新增人员技能
export function addLaboringskill(data) {
  return request({
    url: '/crm-hr/laboringskill',
    method: 'post',
    data: data
  })
}

// 修改人员技能
export function updateLaboringskill(data) {
  return request({
    url: '/crm-hr/laboringskill',
    method: 'put',
    data: data
  })
}

// 删除人员技能
export function delLaboringskill(id) {
  return request({
    url: '/crm-hr/laboringskill/' + id,
    method: 'delete'
  })
}
