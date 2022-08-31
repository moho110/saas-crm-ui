import request from '@/utils/request'

// 查询学期执行列表
export function listXueqiexec(query) {
  return request({
    url: '/crm-hr/xueqiexec/list',
    method: 'get',
    params: query
  })
}

// 查询学期执行详细
export function getXueqiexec(id) {
  return request({
    url: '/crm-hr/xueqiexec/' + id,
    method: 'get'
  })
}

// 新增学期执行
export function addXueqiexec(data) {
  return request({
    url: '/crm-hr/xueqiexec',
    method: 'post',
    data: data
  })
}

// 修改学期执行
export function updateXueqiexec(data) {
  return request({
    url: '/crm-hr/xueqiexec',
    method: 'put',
    data: data
  })
}

// 删除学期执行
export function delXueqiexec(id) {
  return request({
    url: '/crm-hr/xueqiexec/' + id,
    method: 'delete'
  })
}
