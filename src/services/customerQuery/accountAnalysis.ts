import { request } from '@umijs/max';
import {download} from '../index'

interface ResstaticShareList {
  list: List[];
  exchangeRate: ExchangeRate;
}

interface ExchangeRate {
  contains: boolean;
  lastTradingDate: string;
  rate: string;
}

interface List {
  fundcode: string;
  fundname: string;
  balance: string;
  weight: string;
}
export async function staticShareList(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResstaticShareList[]>>('/rest/csibs/account-analysis/static-share/list', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ResallIncomeCurrency {
  summary: Summary;
  subtotal: Subtotal[];
}

interface Subtotal {
  currencyTypeId: string;
  holdCost: number;
  value: number;
  holdIncome: number;
  holdIncomeRate: number;
  holdBonusAmount: number;
  detail: Detail[];
}

interface Detail {
  deadLine: string;
  fundcode: string;
  fundname: string;
  holdShares: number;
  holdNav: number;
  holdCost: number;
  navDate: string;
  nav: number;
  value: number;
  holdIncome: number;
  holdIncomeRate: number;
  holdBonusAmount: number;
}

interface Summary {
  holdCost: number;
  value: number;
  holdIncome: number;
  holdIncomeRate: number;
  '': number;
}

// 持有收益查询按币种汇总
export async function holdIncomeCurrency(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/hold-income/currency', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 持有收益查询按基金类型汇总
export async function holdIncomeFundType(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/hold-income/fund-type', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 全部收益查询按币种汇总
export async function allIncomeCurrency(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/all-income/currency', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 全部收益查询按基金类型汇总
export async function allIncomeFundType(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/all-income/fund-type', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ReqhistoryIncomeCurve {
  keyword: string;
  searchType: string;
  beginDate: string;
  endDate: string;
}
interface ReshistoryIncomeCurve {
  deadLine: string;
  allIncome: string;
}
// 历史收益查询-区间收益曲线
export async function historyIncomeCurve(
  params: ReqhistoryIncomeCurve
) {
  return request<API.Response<ReshistoryIncomeCurve[]>>('/rest/csibs/account-analysis/history-income/curve', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ReshistoryIncomeCurrency {
  summary: Summary;
  subtotal: Subtotal;
}

interface Subtotal {
  currencyTypeId: string;
  currencyTypeName: string;
  intervalCost: number;
  intervalIncome: number;
  detail: Detail;
}

interface Detail {
  currencyTypeId: string;
  fundcode: string;
  fundname: string;
  intervalCost: number;
  intervalIncome: number;
}

interface Summary {
  intervalCost: number;
  intervalIncome: number;
}
// 区间收益明细按币种汇总
export async function historyIncomeCurrency(
  params: ReqhistoryIncomeCurve
) {
  return request<API.Response<ReshistoryIncomeCurrency>>('/rest/csibs/account-analysis/history-income/currency', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ReshistoryIncomeFundType {
  summary: Summary;
  subtotal: Subtotal;
}
interface Detail2 {
  currencyTypeId: string;
  fundcode: string;
  fundname: string;
  allCost: number;
  allIncome: number;
}
interface Subtotal {
  fundTypeId: string;
  fundTypeName: string;
  allCost: number;
  allIncome: number;
  detail: Detail2;
}



interface Summary {
  allCost: number;
  allIncome: number;
}
// 区间收益明细按基金类型汇总
export async function historyIncomeFundType(
  params: ReqhistoryIncomeCurve
) {
  return request<API.Response<ReshistoryIncomeFundType>>('/rest/csibs/account-analysis/history-income/fund-type', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ReqsuperIncomeDaily {
  keyword: string;
  searchType: string;
  beginDate?: string;
  endDate?: string;
  superFundCode?: string;
}

interface RessuperIncomeDaily {
  summary: number;
  detail: Detail[];
}

interface Detail {
  deadLine: string;
  dayIncome: number;
}
//智能组合每日日收益
export async function superIncomeDaily(
  params: ReqsuperIncomeDaily
) {
  return request<API.Response<RessuperIncomeDaily[]>>('/rest/csibs/account-analysis/super-income/daily', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface RessuperIncomeTotal {
  superFundCode: string;
  superFundName: string;
  deadLine: string;
  dayIncome: number;
  allIncome: number;
}



// 智投组合损益
export async function superIncomeTotal(
  params: {keyword: string, searchType: string}
) {
  return request<API.Response<{detail: RessuperIncomeTotal[]}>>('/rest/csibs/account-analysis/super-income/total', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 赎回收益查询按币种汇总
export async function redeemIncomeCurrency(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/redeem-income/currency', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
// 赎回收益查询按币种汇总
export async function redeemIncomeFundType(
  params: {keyword: string,  searchType: number,}
) {
  return request<API.Response<ResallIncomeCurrency>>('/rest/csibs/account-analysis/redeem-income/fund-type', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}





