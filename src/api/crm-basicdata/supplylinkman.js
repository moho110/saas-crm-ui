import request from '@/utils/request'

// 查询供应商联系人列表
export function listSupplylinkman(query) {
  return request({
    url: '/crm-basicdata/supplylinkman/list',
    method: 'get',
    params: query
  })
}

// 查询供应商联系人详细
export function getSupplylinkman(id) {
  return request({
    url: '/crm-basicdata/supplylinkman/' + id,
    method: 'get'
  })
}

// 新增供应商联系人
export function addSupplylinkman(data) {
  return request({
    url: '/crm-basicdata/supplylinkman',
    method: 'post',
    data: data
  })
}

// 修改供应商联系人
export function updateSupplylinkman(data) {
  return request({
    url: '/crm-basicdata/supplylinkman',
    method: 'put',
    data: data
  })
}

// 删除供应商联系人
export function delSupplylinkman(id) {
  return request({
    url: '/crm-basicdata/supplylinkman/' + id,
    method: 'delete'
  })
}
