import { request } from '@umijs/max';
import {download} from '../index'
export interface ReqsurveyList {
    keyword: string;
    type: "unpublished" | "publish" | "invalid";
    createTime: string;
    updateTime: string;  // asc(升序), desc(降序)      
}

export interface RessurveyList {
    surveyId: string;
    surveyName: string;
    type: any;
    count: string;
    questionViews: QuestionView[];
    createUser: string;
    createTime: string;
    updateTime: string;
}

interface QuestionView {
    questionId: number;
    type: any;
    content: string;
    maxSelectedOptionCount: number;
    required: boolean;
    options: Option[];
}

interface Option {
    description: string;
    enableFilling: boolean;
}

// 问卷主列表
export function surveyList(data: API.ListParams<ReqsurveyList>) {
    return request<API.ListResponse<RessurveyList>>('/rest/csibs/survey/list', {
        method: 'post',
        data: { ...data, page: data?.page - 1, }
    });
}

export interface ResseatUserList {
    name: string;
    username: string;
}
// 坐席姓名下拉列表
export function seatUserList() {
    return request<API.Response<ResseatUserList[]>>('/rest/csibs/survey/operator-list', {
        method: 'post',
    });
}
// 导出
export async function surveyExport(
    params: { surveyId: string },
  ) {
    const response = await  request<API.Response<any>>('/rest/csibs/survey/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: "blob",
      data: params,
      getResponse: true,
      timeout: 60000, 
      skipErrorHandler: true
    });
    return download(response)
  }

export interface RessurveyStatistics {
    fillingCount: number;
    startTime: string;
    endTime: string;
    questionStatistics: QuestionStatistic[];
}

export interface QuestionStatistic {
    questionId: number;
    type: 1 | 2 | 3;
    content: string;
    optionStatistics: OptionStatistic[];
}

interface OptionStatistic {
    description: string;
    selectCount: number;
    proportion: number;
}
export function surveyStatistics(data: { surveyId: string }) {
    return request<API.Response<RessurveyStatistics>>('/rest/csibs/survey/statistics', {
        method: 'post',
        data: data
    });
}


//新建问卷
export function surveyCreate(data: any) {
    return request('/rest/csibs/survey/create', {
        method: 'post',
        data: { ...data }
    });
}



//预览发布失效
export function statusUpdate(data: any) {
    return request('/rest/csibs/survey/update-status', {
        method: 'post',
        data: { ...data }
    });
}

//编辑
export function update(data: any) {
    return request('/rest/csibs/survey/update', {
        method: 'post',
        data: { ...data }
    });
}

// 问卷提交记录
export function recordList(data: API.ListParams<ReqsurveyList>) {
    return request<API.ListResponse<RessurveyList>>('/rest/csibs/survey/submit-record/list', {
        method: 'post',
        data: { ...data, page: data?.page - 1, }
    });
}

//客户姓名搜索
export function recordListName() {
    return request('/rest/csibs/survey/submit-record/customer-name', {
        method: 'post',
    });
}


//问卷填写详情
export function recordDetail(data: any) {
    return request<API.Response<ResseatUserList[]>>('/rest/csibs/survey/submit-record/detail', {
        method: 'post',
        data: { ...data }
    });
}

//问卷提交
export function submit(data: any) {
    return request<API.Response<ResseatUserList[]>>('/rest/csibs/survey/submit', {
        method: 'post',
        data: { ...data }
    });
}
