import { request } from '@umijs/max';
import { download } from '../index'

interface ReqrecordAllList {
    fundAccountId: string;
    customerName: string;
    startTime: string;
    endTime: string;
    callRecordType: string;
    emotionTag: string;
    businessTag: string;
    summaryType: string;
    seatId: string;
    solution: string;
    feedback: string;
    callDateType: string;
    order: string;
    page: string;
    pageSize: string;
}


export interface REsrecordAllList {
    callId: string;
    seatName: string;
    acceptTime: string;
    callNumber: string;
    fundAccountId: string;
    type: string;
    solution: string;
    customerName: string;
    email: string;
    feedback: string;
    problem: string;
    category: string;
    source: string;
    emotionTag: string;
    businessTag: string;
}
// 通话记录列表
export async function recordAllList(
    params: API.ListParams<Partial<ReqrecordAllList>>,
    options?: { [key: string]: any },
) {
    return request<API.ListResponse<REsrecordAllList>>('/rest/csibs/call-record/all-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: { ...params, page: params.page - 1 },
        ...(options || {}),
    });
}

export interface ResseatUserList {
    // userId: string;
    // userName: string;
    // nickName: string;
    id: string;
    seatId: string;
    seatName: string;
    email: string;
}

// 坐席姓名下拉列表
export async function seatUserList(
    options?: { [key: string]: any },
) {
    return request<API.Response<ResseatUserList[]>>('/rest/csibs/call-record/seat-user-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    });
}

export interface RessolutionCategory {
    id: string;
    solution: string;
}
// 解决办法
export async function solutionCategory(
    options?: { [key: string]: any },
) {
    return request<API.Response<RessolutionCategory[]>>('/rest/csibs/call-summary/solution-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    });
}

interface ResissueCategory {
    id: string;
    model: string;
    name: string;
    parentId: string;
    children: ResissueCategory[];
}


// 问题类别
export async function issueCategory(
    options?: { [key: string]: any },
) {
    return request<API.Response<ResissueCategory[]>>('/rest/csibs/call-summary/issue-category', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    });
}

// 通话记录列表Excel导出
export async function allListExport(
    params: Partial<ReqrecordAllList>,
) {
    const response = await request<API.Response<any>>('/rest/csibs/call-record/all-list-export', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: "blob",
        data: params,
        getResponse: true,
        skipErrorHandler: true
    });
    return download(response)
}

interface RescallRecordSpeeches {
    ucid: string;
    agentId: string;
    order: number;
    callNumber: string;
    text: string;
    speechTime: string;
    role: string;
    stage: string;
}
// 客户通话记录实施通话

export async function callRecordSpeeches(
    params: {
        customerId: string, // 客户ID
        callNumber: string
    }
) {
    return request<API.Response<RescallRecordSpeeches[]>>('/rest/csibs/call-record/speeches', {
        skipErrorHandler: true, //跳过全局错误拦截
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

// 情绪标签下拉列表
export async function emotionTagList(
    params: any
) {
    return request<API.Response<RescallRecordSpeeches[]>>('/rest/csibs/call-record/emotion-tag-list', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

// 业务标签下拉列表
export async function businessTagList(
    params: any
) {
    return request<API.Response<RescallRecordSpeeches[]>>('/rest/csibs/call-record/business-tag-list', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}


export interface RivrRecordList {
    userId: string;
    question: string;
    answer: string;
    startTime: string;
    endTime: string;
    ivrCallId: string;
    callNumber: string;
}
// 通话记录ivr接口
export async function ivrRecordList(
    params: {
        customerId: string, // 客户ID
        callNumber: string
    }
) {
    return request<API.Response<any>>('/rest/csibs/call-record/ivr-record-list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

// 转人工前提醒
export async function beforeManual(
    params: {
        customerId: string, // 客户ID
        callNumber: string
    }
) {
    return request<API.Response<any>>(
        '/rest/csibs/reminder/switch/before-manual',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: params,
        },
    );
}

interface ReqsubmitNoCallIn {
    customerId: string;
    fundAccountId: string;
    callNumber: string;
    record: string;
    customerName: string;
    callCategoryIds: string[];
    solution: string;
}
// 提交话后小结（无来电）
export async function submitNoCallIn(
    params: ReqsubmitNoCallIn,
) {
    return request<API.Response<any>>('/rest/csibs/call-summary/submit/no-call-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

interface RescallRecordCurrent {
    callId: string;
    customerId: string;
    callNumber: string;
    calledNumber: string;
    callType: string;
    hotLine: string;
}
// 当前通话记录
export async function callRecordCurrent(
) {
    return request<API.Response<RescallRecordCurrent>>('/rest/csibs/call-record/current', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

interface ReqsubmitDailout {
    callId: string;
    customerId: string;
    fundAccountId: string;
    record: string;
    customerName: string;
    callCategoryIds: string[];
    solution: string;
}
// 提交话后小结（外呼）
export async function submitDailout(
    params: ReqsubmitDailout,
) {
    return request<API.Response<any>>('/rest/csibs/call-summary/submit/dailout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}
// 提交话后小结（批量外呼）
export async function submitBatchCall(
    params: ReqsubmitDailout,
) {
    return request<API.Response<any>>('/rest/csibs/call-summary/submit/batch-call', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}

// phone情况phone
// 提交话后小结（批量外呼）
export async function submitPhone(
    params: ReqsubmitDailout,
) {
    return request<API.Response<any>>('/rest/csibs/call-summary/submit/phone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}