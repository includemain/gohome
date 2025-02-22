import { request } from '@umijs/max';
// import download from '../download';



//重要事项列表
export function noticeQuery(data: any) {
    return request('/rest/csoip/notice/query', {
        method: 'post',
        data: { ...data, page: data?.page - 1, }
    });
}

//新建重要事项提醒
export function noticeAdd(data: any) {
    return request('/rest/csoip/notice/add', {
        method: 'post',
        data: { ...data }
    });
}

//编辑未发布重要事项提醒
export function notRealseUpdate(data: any) {
    return request('/rest/csoip/notice/update', {
        method: 'post',
        data: { ...data }
    });
}


//下架重要事项提醒
export function takeOff(data: any) {
    return request('/rest/csoip/notice/take-off', {
        method: 'post',
        data: { ...data }
    });
}

//部门列表查询
export function accountGroups() {
    return request('/rest/csoip/notice/account-groups', {
        method: 'post',
    });
}

//创建人列表
export function userGroups() {
    return request('/rest/csoip/notice/user-groups', {
        method: 'post',
    });
}


//编辑回显
export function updateQuery(data: any) {
    return request('/rest/csoip/notice/update/query', {
        method: 'post',
        data: { ...data }
    });
}

//触发重要事项提醒
export function noticeList() {
    return request('/rest/csoip/notice/list', {
        method: 'post',
    });
}

//记录重要事项提醒
export function noticeTouch(data: any) {
    return request('/rest/csoip/notice/touch', {
        method: 'post',
        data: { ...data }
    });
}