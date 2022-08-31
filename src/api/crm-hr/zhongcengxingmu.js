import request from '@/utils/request'

// 查询中层干部测评项目明细列表
export function listZhongcengxingmu(query) {
  return request({
    url: '/crm-hr/zhongcengxingmu/list',
    method: 'get',
    params: query
  })
}

// 查询中层干部测评项目明细详细
export function getZhongcengxingmu(id) {
  return request({
    url: '/crm-hr/zhongcengxingmu/' + id,
    method: 'get'
  })
}

// 新增中层干部测评项目明细
export function addZhongcengxingmu(data) {
  return request({
    url: '/crm-hr/zhongcengxingmu',
    method: 'post',
    data: data
  })
}

// 修改中层干部测评项目明细
export function updateZhongcengxingmu(data) {
  return request({
    url: '/crm-hr/zhongcengxingmu',
    method: 'put',
    data: data
  })
}

// 删除中层干部测评项目明细
export function delZhongcengxingmu(id) {
  return request({
    url: '/crm-hr/zhongcengxingmu/' + id,
    method: 'delete'
  })
}
