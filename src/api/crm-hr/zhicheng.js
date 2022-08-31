import request from '@/utils/request'

// 查询工作人员职称列表
export function listZhicheng(query) {
  return request({
    url: '/crm-hr/zhicheng/list',
    method: 'get',
    params: query
  })
}

// 查询工作人员职称详细
export function getZhicheng(id) {
  return request({
    url: '/crm-hr/zhicheng/' + id,
    method: 'get'
  })
}

// 新增工作人员职称
export function addZhicheng(data) {
  return request({
    url: '/crm-hr/zhicheng',
    method: 'post',
    data: data
  })
}

// 修改工作人员职称
export function updateZhicheng(data) {
  return request({
    url: '/crm-hr/zhicheng',
    method: 'put',
    data: data
  })
}

// 删除工作人员职称
export function delZhicheng(id) {
  return request({
    url: '/crm-hr/zhicheng/' + id,
    method: 'delete'
  })
}
