import request from '@/utils/request'

// 查询行政考勤补登列表
export function listKaoqinbudeng(query) {
  return request({
    url: '/crm-hr/kaoqinbudeng/list',
    method: 'get',
    params: query
  })
}

// 查询行政考勤补登详细
export function getKaoqinbudeng(id) {
  return request({
    url: '/crm-hr/kaoqinbudeng/' + id,
    method: 'get'
  })
}

// 新增行政考勤补登
export function addKaoqinbudeng(data) {
  return request({
    url: '/crm-hr/kaoqinbudeng',
    method: 'post',
    data: data
  })
}

// 修改行政考勤补登
export function updateKaoqinbudeng(data) {
  return request({
    url: '/crm-hr/kaoqinbudeng',
    method: 'put',
    data: data
  })
}

// 删除行政考勤补登
export function delKaoqinbudeng(id) {
  return request({
    url: '/crm-hr/kaoqinbudeng/' + id,
    method: 'delete'
  })
}
