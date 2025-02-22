import { request } from '@umijs/max';
import { download } from '../index';

// 失败业务表格数据
interface recordParams {
  customerId: string;
  sorting: object;
  pageSize: number;
  page: number;
}
interface recordRes {
  list: any;
}
export async function failedBusiness(params: API.ListParams<recordParams>) {
  return request<API.ListResponse<recordRes>>(
    '/rest/csibs/trade/failed-business/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      timeout: 300000,
    },
  );
}

// 失败业务弹窗
interface recordDetailParams {
  customerId: string;
  sorting: object;
  pageSize: number;
  page: number;
  applicationNo: string;
}
interface recordDetailRes {
  list: any;
}
export async function failedBusinessDetail(
  params: API.ListParams<recordDetailParams>,
) {
  return request<API.ListResponse<recordDetailRes>>(
    '/rest/csibs/trade/failed-business/detail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      getResponse: true,
    },
  );
}

// 分红方式变更列表
interface bonusParams {
  customerId: string;
  pageSize: number;
  page: number;
  confirmDateBegin: string;
  confirmDateEnd: string;
  sorting: object;
  fundCode: string;
  agencyCode: string;
  fundAccountId: string;
  businessCodeAndTaId: string;
}
interface bonusRes {
  list: any;
  filterings: any;
}
export async function bonusChange(params: API.ListParams<bonusParams>) {
  return request<API.ListResponse<bonusRes>>(
    '/rest/csibs/trade/bonus-change/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      timeout: 300000,
    },
  );
}

// 分红方式变更导出
export async function bonusChangeExport(params: {
  customerId: string;
  confirmDateBegin: string;
  confirmDateEnd: string;
  sorting: object;
  fundCode: string;
  agencyCode: string;
  fundAccountId: string;
  businessCodeAndTaId: string;
}) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/bonus-change/export',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true,
    },
  );
  return download(response);
}

// 分红登记列表
interface bonusListParams {
  customerId: string;
  pageSize: number;
  page: number;
}
interface BonusList {
  list: any;
}
export async function bonusList(params: API.ListParams<bonusListParams>) {
  return request<API.ListResponse<BonusList>>('/rest/csibs/trade/bonus/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, page: params.page - 1 },
    timeout: 300000,
    skipErrorHandler: true,
  });
}

// 分红登记导出
export async function bonusRedExport(params: { customerId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/bonus/export',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true,
    },
  );
  return download(response);
}

// 分红登记结转份额
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
}
interface bonusIncome {
  list: any;
}
export async function bonusIncomeVolumn(
  params: API.ListParams<bonusIncomeParams>,
) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/bonus/income-volume',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      getResponse: true,
    },
  );
}

// 分红登记详情
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
}
interface bonusIncome {
  list: any;
}
export async function bonusDetail(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/bonus/detail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      getResponse: true,
    },
  );
}

//持仓列表
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
}
interface bonusIncome {
  list: any;
}
export async function shareInfo(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/share-info/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      timeout: 300000,
    },
  );
}

//持仓申请基金筛选
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function shareInfoFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/share-info/fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持仓交易机构
export interface ResAgency {
  agencyCode: string;
  agencyName: string;
}
export async function shareAgency(params: { customerId?: string }) {
  return request<API.Response<ResAgency[]>>(
    '/rest/csibs/trade/share-info/agency',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持仓托管账户
export interface ResTarget {
  fundCode: string;
  fundName: string;
}
export async function shareFund(params: { customerId?: string }) {
  return request<API.Response<ResTarget[]>>(
    '/rest/csibs/trade/share-info/fund-account',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持仓活期通
export interface ResTarget {
  fundCode: string;
  fundName: string;
}
export async function hqtFund(params: { customerId?: string }) {
  return request<API.Response<ResTarget[]>>(
    '/rest/csibs/trade/share-info/hqt-fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持仓交易渠道
export interface ResBussiness {
  businessCode: string;
  businessName: string;
}
export async function shareChannel(params: { customerId?: string }) {
  return request<API.Response<ResBussiness[]>>(
    '/rest/csibs/trade/share-info/channel',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持仓列表下方总计
export interface ResBussiness {
  rmbSum: string;
  dollarSum: string;
}
export async function shareSum(params: { customerId?: string }) {
  return request<API.Response<ResBussiness[]>>(
    '/rest/csibs/trade/share-info/hold-share-sum',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持有型可赎回基金名称
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function shareHoldingFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/share-info/share-detail/holding/fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//持有型基金
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
}
interface bonusIncome {
  fundCode: string;
  confirmId: string;
  confirmDate: string;
  redeemDate: string;
  holdShares: number;
  frozenShares: number;
  midwayVolume: number;
  balance: number;
  agencyName: number;
  market: number;
}
export async function holdingList(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/share-info/share-detail/holding/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
    },
  );
}

// 持有型导出
export async function holdingExport(params: {
  customerId: string;
  sorting: object;
}) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/share-info/share-detail/holding/export',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true,
    },
  );
  return download(response);
}

//滚动下可赎回基金名称
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function shareRollingFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/share-info/share-detail/rolling/fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//滚动型基金  -------
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
}
interface bonusIncome {
  fundCode: string;
  confirmId: string;
  confirmDate: string;
  redeemDate: string;
  holdShares: number;
  frozenShares: number;
  midwayVolume: number;
  balance: number;
  agencyName: number;
  market: number;
}
export async function rollingList(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/share-info/share-detail/rolling/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
    },
  );
}

// 滚动型导出
export async function rollingExport(params: { customerId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/share-info/share-detail/rolling/export',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true,
    },
  );
  return download(response);
}

//交易信息列表
interface bonusIncomeParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
  fundCode: string;
  targetFundCode: string;
  involvedFundCode: string;
  agencyCode: string;
  fundAccountId: string;
  businessCodes: string[];
  confirmDateBegin: string;
  confirmDateEnd: string;
}
interface bonusIncome {
  list: any;
}
export async function tradeInfo(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      timeout: 300000,
    },
  );
}

//申请基金筛选
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function tradeInfoFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/trade-info/fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//转入基金筛选
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function tradeTargetFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/trade-info/target-fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//涉及基金筛选
export interface Resshare {
  fundCode: string;
  fundName: string;
}
export async function tradeInvolvedFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/trade-info/involved-fund',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//交易类型筛选
export interface Resshare {
  businessCode: string;
  businessName: string;
}
export async function businessFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/trade-info/business',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//交易机构筛选
export interface Resshare {
  agencyCode: string;
  agencyName: string;
}
export async function agencyFund(params: { customerId?: string }) {
  return request<API.Response<Resshare[]>>(
    '/rest/csibs/trade/trade-info/agency',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//交易机构筛选
export async function fundAccount(params: { customerId?: string }) {
  return request<API.Response<[]>>(
    '/rest/csibs/trade/trade-info/fund-account',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 交易明细导出
export async function tradeExport(params: { customerId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/trade-info/export',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true,
    },
  );
  return download(response);
}

//基金转换转入弹窗
interface bonusIncomeParams {
  // pageSize: number;
  // page: number;
  sorting: object;
  fundCode: string;
  fundAccountId: string;
  applicationId: string;
  applicationVolume: string;
}
interface bonusIncome {
  data: any;
}
export async function fundConversion(
  params: API.ListParams<bonusIncomeParams>,
) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/fund-conversion',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//非智投的赎回交易
interface bonusIncomeParams {
  // pageSize: number;
  // page: number;
  fundAccountId: string;
  applicationId: string;
}
interface bonusIncome {
  data: any;
}
export async function redeemAndNoZt(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/redeem-and-no-zt',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//转托管
interface bonusIncomeParams {
  // pageSize: number;
  // page: number;
  fundAccountId: string;
  applicationId: string;
  businessCode: string;
}
interface bonusIncome {
  data: any;
}
export async function transferOfCustody(
  params: API.ListParams<bonusIncomeParams>,
) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/transfer-of-custody',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//bz
interface bonusIncomeParams {
  // pageSize: number;
  // page: number;
  applicationId: string;
}
interface bonusIncome {
  data: any;
}
export async function bz(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/bz',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//bz
interface bonusIncomeParams {
  // pageSize: number;
  // page: number;
  applicationId: string;
}
interface bonusIncome {
  data: any;
}
export async function zt(params: API.ListParams<bonusIncomeParams>) {
  return request<API.ListResponse<bonusIncome>>(
    '/rest/csibs/trade/trade-info/zt',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//持有型基金
interface bonusIncomeParams {
  fundAccountId: string;
  tradeAccountId: string;
  sorting: object;
}
interface shareDetail {
  fundName: string;
  hasRisk: boolean;
  navDate: number;
  holdShares: string;
  frozenShares: string;
  midwayVolume: string;
  dividendMethod: string;
  nav: string;
  balance: string;
  percentage: string;
}
export async function shareInfoDetail(
  params: API.ListParams<bonusIncomeParams>,
) {
  return request<API.ListResponse<shareDetail>>(
    '/rest/csibs/trade/share-info/detail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
