import request from '@/utils/request'

// 查询工作人员合同列表
export function listWorkerhetong(query) {
  return request({
    url: '/crm-hr/workerhetong/list',
    method: 'get',
    params: query
  })
}

// 查询工作人员合同详细
export function getWorkerhetong(id) {
  return request({
    url: '/crm-hr/workerhetong/' + id,
    method: 'get'
  })
}

// 新增工作人员合同
export function addWorkerhetong(data) {
  return request({
    url: '/crm-hr/workerhetong',
    method: 'post',
    data: data
  })
}

// 修改工作人员合同
export function updateWorkerhetong(data) {
  return request({
    url: '/crm-hr/workerhetong',
    method: 'put',
    data: data
  })
}

// 删除工作人员合同
export function delWorkerhetong(id) {
  return request({
    url: '/crm-hr/workerhetong/' + id,
    method: 'delete'
  })
}
