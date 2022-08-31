import request from '@/utils/request'

// 查询证件类型列表
export function listZhengjianleixing(query) {
  return request({
    url: '/crm-hr/zhengjianleixing/list',
    method: 'get',
    params: query
  })
}

// 查询证件类型详细
export function getZhengjianleixing(id) {
  return request({
    url: '/crm-hr/zhengjianleixing/' + id,
    method: 'get'
  })
}

// 新增证件类型
export function addZhengjianleixing(data) {
  return request({
    url: '/crm-hr/zhengjianleixing',
    method: 'post',
    data: data
  })
}

// 修改证件类型
export function updateZhengjianleixing(data) {
  return request({
    url: '/crm-hr/zhengjianleixing',
    method: 'put',
    data: data
  })
}

// 删除证件类型
export function delZhengjianleixing(id) {
  return request({
    url: '/crm-hr/zhengjianleixing/' + id,
    method: 'delete'
  })
}
