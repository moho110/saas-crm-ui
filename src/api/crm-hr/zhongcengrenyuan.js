import request from '@/utils/request'

// 查询中层干部被评人员明细列表
export function listZhongcengrenyuan(query) {
  return request({
    url: '/crm-hr/zhongcengrenyuan/list',
    method: 'get',
    params: query
  })
}

// 查询中层干部被评人员明细详细
export function getZhongcengrenyuan(id) {
  return request({
    url: '/crm-hr/zhongcengrenyuan/' + id,
    method: 'get'
  })
}

// 新增中层干部被评人员明细
export function addZhongcengrenyuan(data) {
  return request({
    url: '/crm-hr/zhongcengrenyuan',
    method: 'post',
    data: data
  })
}

// 修改中层干部被评人员明细
export function updateZhongcengrenyuan(data) {
  return request({
    url: '/crm-hr/zhongcengrenyuan',
    method: 'put',
    data: data
  })
}

// 删除中层干部被评人员明细
export function delZhongcengrenyuan(id) {
  return request({
    url: '/crm-hr/zhongcengrenyuan/' + id,
    method: 'delete'
  })
}
