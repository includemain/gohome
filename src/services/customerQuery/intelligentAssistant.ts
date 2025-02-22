import { request } from '@umijs/max';
import {download} from '../index'

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

export interface ResswitchList {
  username: string;
  name: string;
  roleNames: string[];
  status: number;
}
// 实时提醒助手详细设置
export async function switchList() {
    return request<API.Response<ResswitchList[]>>(
      '/rest/csibs/reminder/switch/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  // 实时提醒助手总开关状态查询
  export async function mainSwitchStatus() {
    return request<API.Response<boolean>>(
      '/rest/csibs/reminder/main-switch/status',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
  // 实时提醒助手总开关打开
  export async function mainSwitchOpen() {
    return request<API.Response<any>>(
      '/rest/csibs/reminder/main-switch/open',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

// 实时提醒助手总开关关闭
export async function mainSwitchClose() {
  return request<API.Response<any>>(
    '/rest/csibs/reminder/main-switch/close',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 详细设置-开启助手
export async function reminderSwitchOpen(
  params: { userId: string[];  },
) {
  return request<API.Response<any>>(
    '/rest/csibs/reminder/switch/open',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

// 详细设置-关闭助手
export async function reminderSwitchClose(
  params: { userId: string[];  },
) {
  return request<API.Response<any>>(
    '/rest/csibs/reminder/switch/close',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}