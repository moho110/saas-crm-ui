import request from '@/utils/request'

// 查询行政请假列表
export function listXingzhengqingjia(query) {
  return request({
    url: '/crm-hr/xingzhengqingjia/list',
    method: 'get',
    params: query
  })
}

// 查询行政请假详细
export function getXingzhengqingjia(id) {
  return request({
    url: '/crm-hr/xingzhengqingjia/' + id,
    method: 'get'
  })
}

// 新增行政请假
export function addXingzhengqingjia(data) {
  return request({
    url: '/crm-hr/xingzhengqingjia',
    method: 'post',
    data: data
  })
}

// 修改行政请假
export function updateXingzhengqingjia(data) {
  return request({
    url: '/crm-hr/xingzhengqingjia',
    method: 'put',
    data: data
  })
}

// 删除行政请假
export function delXingzhengqingjia(id) {
  return request({
    url: '/crm-hr/xingzhengqingjia/' + id,
    method: 'delete'
  })
}
