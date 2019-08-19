import http from '../../tools/http'

/**
 * 获取列表数据
 */
export function list(params) {
    const url = `/comment/list`    
    return http({ url, type: 'post', params})
}

/**
 * 修改评论审核状态
 */
export function audit(params) {
    const url = `/comment/audit`
    return http({url, params, type: 'POST'})
}

/**
 * 删除评论
 */
export function del(params) {
    const url = `/comment/delete`
    return http({url, params, type: 'post'})
}