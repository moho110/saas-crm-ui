import request from '@/utils/request'

// 查询评论表列表
export function listComment(query) {
  return request({
    url: '/crm-mytable/comment/list',
    method: 'get',
    params: query
  })
}

// 查询评论表详细
export function getComment(id) {
  return request({
    url: '/crm-mytable/comment/' + id,
    method: 'get'
  })
}

// 新增评论表
export function addComment(data) {
  return request({
    url: '/crm-mytable/comment',
    method: 'post',
    data: data
  })
}

// 修改评论表
export function updateComment(data) {
  return request({
    url: '/crm-mytable/comment',
    method: 'put',
    data: data
  })
}

// 删除评论表
export function delComment(id) {
  return request({
    url: '/crm-mytable/comment/' + id,
    method: 'delete'
  })
}
