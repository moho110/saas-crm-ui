import request from '@/utils/request'

// 查询工作报告列表
export function listWorkreport(query) {
  return request({
    url: '/crm-mytable/workreport/list',
    method: 'get',
    params: query
  })
}

// 查询工作报告详细
export function getWorkreport(id) {
  return request({
    url: '/crm-mytable/workreport/' + id,
    method: 'get'
  })
}

// 新增工作报告
export function addWorkreport(data) {
  return request({
    url: '/crm-mytable/workreport',
    method: 'post',
    data: data
  })
}

// 修改工作报告
export function updateWorkreport(data) {
  return request({
    url: '/crm-mytable/workreport',
    method: 'put',
    data: data
  })
}

// 删除工作报告
export function delWorkreport(id) {
  return request({
    url: '/crm-mytable/workreport/' + id,
    method: 'delete'
  })
}
