import request from '@/utils/request'

// 查询采购单临时颜色表列表
export function listTmpcolor(query) {
  return request({
    url: '/crm-buy/tmpcolor/list',
    method: 'get',
    params: query
  })
}

// 查询采购单临时颜色表详细
export function getTmpcolor(id) {
  return request({
    url: '/crm-buy/tmpcolor/' + id,
    method: 'get'
  })
}

// 新增采购单临时颜色表
export function addTmpcolor(data) {
  return request({
    url: '/crm-buy/tmpcolor',
    method: 'post',
    data: data
  })
}

// 修改采购单临时颜色表
export function updateTmpcolor(data) {
  return request({
    url: '/crm-buy/tmpcolor',
    method: 'put',
    data: data
  })
}

// 删除采购单临时颜色表
export function delTmpcolor(id) {
  return request({
    url: '/crm-buy/tmpcolor/' + id,
    method: 'delete'
  })
}
