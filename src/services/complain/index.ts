/*
 * @Author: lixiaoyu lixiaoyu@amctest.com
 * @Date: 2024-08-23 10:58:19
 * @LastEditors: wangtao wangtao@bjblackhole.com
 * @LastEditTime: 2024-12-12 17:00:08
 * @FilePath: /csibs-fontend/src/services/complain/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { request } from '@umijs/max';

// import download from '../download';

//查询模板列表  √
export function adviceList(data: any) {
    return request('/rest/csibs/advice/list',{
        method: 'post',
        data
    });
}

//投诉建议分类
export function categories() {
    return request('/rest/csibs/advice/categories',{
        method: 'post',

    });
}

//投诉建议分类
export function operate(data: any) {
    return request('/rest/csibs/advice/operate',{
        method: 'post',
        data
    });
}

/**
 * @number 4
 * @name: 批量注册查查询列表页
 * @param {*}
 * @return {*}
 */
export function queryBatch(data: any) {
    return request( "/rest/csibs/account/batch-registered",{
        method: "post",
        data: { ...data, page: data.page - 1 },
    });
}
/**
 * @number 5
 * @name: 账单订制查询
 * @param {*}
 * @return {*}
 */
export function querySubscription(data: any) {
    return request("/rest/csibs/bill/subscription-list",{
        method: "post",
      data: { ...data, page: data.page - 1 },
    });
}