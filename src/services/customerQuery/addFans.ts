import { request } from '@umijs/max';
import {download} from '../index'

// export async function callRecordLisxt(
//     params: API.ListParams<{ customerId: string;callNumber?: string; }>,
//     options?: { [key: string]: any },
//   ) {
//     return request<API.ListResponse<RcallRecordList>>('/rest/csibs/call-record/list', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: { ...params, page: params.page - 1 },
//       ...(options || {}),
//     });
//   }
  export interface FriendAddedItem {
  mobile: string;
  source: string;
  information: Information[];
}

interface Information {
  unionId: string;
  nickName: string;
  friendDetailList: FriendDetailList[];
}

interface FriendDetailList {
  unionId: string;
  nickName: string;
  addTime: string;
}


export async function friendAddedList(
  params: ReqfriendAddedList,
  options?: { [key: string]: any },
) {
  return request<API.Response<FriendAddedItem[]>>('/rest/csibs/friend/added-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}


export interface ResAvailableTasks {
  id: string;
  taskName: string;
  tags: string[];
  verifyMessage: string;
}
// 查询可用的加粉任务
export async function availableTasks(
  params: {status?: number,  keyword?: string,}
) {
  return request<API.Response<ResAvailableTasks[]>>('/rest/csibs/friend/tasks', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


interface ReqHistoryList {
  customer: string;
  operator: string;
  createTimeStart: string;
  createTimeEnd: string;
  taskName: string;
  statusList: number[];
  profileName: string;
  executeTimeStart: string;
  executeTimeEnd: string;
  clue: string;
}

interface ResHistoryList {
  id: string;
  taskId: string;
  taskName: string;
  reAddStatus: string;
  custId: string;
  custName: string;
  clue: string;
  status: string;
  execueTime: string;
  createTime: string;
  operator: string;
  profileName: string;
  unionId: string;
  remarkName: string;
  description: string;
  verifyMsg: string;
  helloMsg: any[];
  addFriendPictures: any[];
}
// 历史记录
export async function historyList(
  params: API.ListParams<Partial<ReqHistoryList>>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResHistoryList>>('/rest/csibs/friend/history-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, page: params.page - 1 },
    ...(options || {}),
  });
}


// 获取所有操作人
export async function operatorList(
) {
  return request<API.Response<string[]>>('/rest/csibs/friend/operator-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 获取所有操作人
export async function profileList(
) {
  return request<API.Response<string[]>>('/rest/csibs/friend/profile-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


// 查询欢迎语
export async function friendGreeting(
  params: { taskId: string },
) {
  return request<API.Response<{
    type: any,   // 欢迎语类型 1:文本内容;3:图片url;18:小程序json
    content: string // 欢迎语内容
  }[]>>('/rest/csibs/friend/greeting', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 查询是否可以添加好友
interface ReqfriendCanAdd {
  mobile: string;
}

interface ResfriendCanAdd {
  canAdd: boolean;
  message: string;
}
export async function friendCanAdd(
  params: ReqfriendCanAdd,
) {
  return request<API.Response<ResfriendCanAdd>>('/rest/csibs/friend/can-add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

interface ReqfriendAdd {
  clue: string;
  custId: string;
  custName: string;
  remarkName: string;
  description: string;
  taskId: string;
  verifyMsg: string;
  helloMsg: HelloMsg[];
  tags: string[];
}

interface HelloMsg {
  type: string;
  content: string;
}
// 添加好友
export async function friendAdd(
  params: ReqfriendAdd,
) {
  return request<API.Response<any>>('/rest/csibs/friend/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 重加好友
export async function friendReAdd(
  params: {jobId: string},
) {
  return request<API.Response<any>>('/rest/csibs/friend/re-add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}



// 导出
export async function friendExport(
  params: {jobId: string},
) {
  const response = await  request<API.Response<any>>('/rest/csibs/friend/export', {
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



