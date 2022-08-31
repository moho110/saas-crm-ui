import request from '@/utils/request'

// 查询工作人员证照列表
export function listZhengzhao(query) {
  return request({
    url: '/crm-hr/zhengzhao/list',
    method: 'get',
    params: query
  })
}

// 查询工作人员证照详细
export function getZhengzhao(id) {
  return request({
    url: '/crm-hr/zhengzhao/' + id,
    method: 'get'
  })
}

// 新增工作人员证照
export function addZhengzhao(data) {
  return request({
    url: '/crm-hr/zhengzhao',
    method: 'post',
    data: data
  })
}

// 修改工作人员证照
export function updateZhengzhao(data) {
  return request({
    url: '/crm-hr/zhengzhao',
    method: 'put',
    data: data
  })
}

// 删除工作人员证照
export function delZhengzhao(id) {
  return request({
    url: '/crm-hr/zhengzhao/' + id,
    method: 'delete'
  })
}
