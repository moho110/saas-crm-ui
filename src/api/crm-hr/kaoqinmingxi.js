import request from '@/utils/request'

// 查询考勤明细列表
export function listKaoqinmingxi(query) {
  return request({
    url: '/crm-hr/kaoqinmingxi/list',
    method: 'get',
    params: query
  })
}

// 查询考勤明细详细
export function getKaoqinmingxi(id) {
  return request({
    url: '/crm-hr/kaoqinmingxi/' + id,
    method: 'get'
  })
}

// 新增考勤明细
export function addKaoqinmingxi(data) {
  return request({
    url: '/crm-hr/kaoqinmingxi',
    method: 'post',
    data: data
  })
}

// 修改考勤明细
export function updateKaoqinmingxi(data) {
  return request({
    url: '/crm-hr/kaoqinmingxi',
    method: 'put',
    data: data
  })
}

// 删除考勤明细
export function delKaoqinmingxi(id) {
  return request({
    url: '/crm-hr/kaoqinmingxi/' + id,
    method: 'delete'
  })
}
