import request from '@/utils/request'

// 查询中层干部测评内容明细列表
export function listZhongcengmingxi(query) {
  return request({
    url: '/crm-hr/zhongcengmingxi/list',
    method: 'get',
    params: query
  })
}

// 查询中层干部测评内容明细详细
export function getZhongcengmingxi(id) {
  return request({
    url: '/crm-hr/zhongcengmingxi/' + id,
    method: 'get'
  })
}

// 新增中层干部测评内容明细
export function addZhongcengmingxi(data) {
  return request({
    url: '/crm-hr/zhongcengmingxi',
    method: 'post',
    data: data
  })
}

// 修改中层干部测评内容明细
export function updateZhongcengmingxi(data) {
  return request({
    url: '/crm-hr/zhongcengmingxi',
    method: 'put',
    data: data
  })
}

// 删除中层干部测评内容明细
export function delZhongcengmingxi(id) {
  return request({
    url: '/crm-hr/zhongcengmingxi/' + id,
    method: 'delete'
  })
}
