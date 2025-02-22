import { request } from '@umijs/max';
export * from './accountAnalysis';
export * from './addFans';
export * from './customBottom';
export * from './totalBus';
export * from './transactionInformation';
// 获取表格数据案例
export async function queryList(
  params: {
    keyword?: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<ListItem>>('/api/v1/user', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

type ListItem = {
  name: string;
  number: string;
};
export interface UserListItem {
  customerId: string;
  customerName: string;
  paperType: string;
  paperTypeText: string;
  paperNo: string;
  mobile: string;
  email: string;
  address: null;
  fundAccountIds: string[];
  promotionManager?: string;
}

// 查询用户
export async function queryUserList(
  params: API.ListParams<{ keyword: string }>,
) {
  return request<API.ListResponse<UserListItem>>(
    '/rest/csibs/customer/search',
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

export interface UserBaseInfo {
  highNetValue: boolean;
  marketingBlacklist: boolean;
  customerId: string;
  customerName: string;
  customerAge: number;
  customerSex: string;
  customerMobile: string;
  customerEmail: string;
  customerAddress: null;
  fundAccounts: FundAccount[];
  remark: string;
  labels: Label[];
  investmentAdvisoryLabel: InvestmentAdvisoryLabel;
  didiLabel: string;
}

interface InvestmentAdvisoryLabel {
  status: string;
  timestamp: string;
}

interface Label {
  labelId: string;
  labelName: string;
  labelType: string;
  labelCategory: string;
  labeled: boolean;
}

interface FundAccount {
  fundAccountDesc: string;
  fundAccountId: string;
  tradeAccounts: TradeAccount[];
}

export interface TradeAccount {
  tradeAccountDesc: string;
  userPoint: number;
  userLevel: string;
  riskLevel: string;
  totalExperience: number;
  experience: number;
  tradeAccountId: string;
  banType: string;
  certificateExpireTime: number;
  certificateNo: string;
  certificateType: string;
  bankcards: Bankcard[];
}

export interface Bankcard {
  bankNumber: string;
  paymentAccountId: string;
  currentAccountId: string;
  trustChannelName: string;
  trustChannelId: string;
  bandName: string;
  status: string;
}

// 获取用户基本不信息
export async function queryUserbaseInfo(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserBaseInfo>>('/rest/csibs/customer/base-info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

// 一鲸落，万物生,queryUserbaseInfo被拆成四个接口
// 客户账号信息
export async function queryAccountInfo(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserBaseInfo>>(
    '/rest/csibs/customer/account-info',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}
// 客户积分等级信息

export async function queryUserLevel(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserBaseInfo>>(
    '/rest/csibs/customer/user-level',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}

// 客户标签信息
export async function customerLabels(
  params: { customerId: string; callNumber?: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserBaseInfo>>('/rest/csibs/customer/labels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}
// 联系信息
export interface UserConcatInfoRes {
  callNumber: string;
  phone: string;
  mobile: string;
  tradeMobile: string;
  nonSelfMobile: boolean;
  nonSelfTradeMobile: boolean;
  invalidMobile: boolean;
  invalidTradeMobile: boolean;
  mobileBound: boolean;
  tradeMobileBound: boolean;
  email: string;
  postCode: string;
  address: null;
  keyTrajectory: null;
}
export async function userContactInfo(
  params: { customerId: string; tradeAccountId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserConcatInfoRes>>('/rest/csibs/contact/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}
interface PcontactUpdate {
  phone: string;
  mobile: string;
  nonSelfMobile: boolean;
  nonSelfTradeMobile: boolean;
  invalidMobile: boolean;
  invalidTradeMobile: boolean;
  email: string;
  postCode: string;
  address: string;
  customerId: string;
}
// 更新联系信息
export async function contactUpdate(
  params: PcontactUpdate,
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/rest/csibs/contact/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

// 更新备注
export async function updateRemark(
  params: { customerId: string; remark: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<UserConcatInfoRes>>(
    '/rest/csibs/customer/update-remark',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}

// 更新标签
export async function updateLabels(
  params: {
    customerId: string;
    labeledLabelIds: string[];
    notLabeledLabelIds: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>('/rest/csibs/customer/update-labels', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export interface ResdiagnoseBankcard {
  hasShareVolume: boolean;
  hasTransitTrade: boolean;
  hasUnderwayProfit: boolean;
  hasTransitAmount: boolean;
  hasWithholdAgreement: boolean;
  hasTradePlan: boolean;
  hasModifyCard: boolean;
}

// 银行卡诊断
export async function diagnoseBankcard(
  params: {
    tradeAccountId: string;
    paymentAccountId: string;
    currentAccountId: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResdiagnoseBankcard>>(
    '/rest/csibs/account/diagnose-bankcard',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}
interface RespointRevenue {
  amount: number;
  giftName: string;
  createTime: string;
}

// 开户信息
export interface ResOpenAccountInfo {
  openAccountOperations: OpenAccountOperation[];
  openAccountOperator: OpenAccountOperator;
}

interface OpenAccountOperator {
  name: string;
  paperNo: string;
  phone: string;
  mobile: string;
  officePhone: string;
  fax: string;
  postCode: string;
  email: string;
  address: string;
  nation: string;
}

interface OpenAccountOperation {
  applicationId: string;
  confirmId: string;
  agencyCode: string;
  agencyName: string;
  branchCode: string;
  businessName: string;
  fundAccountId: string;
  applicationTime: number;
  confirmTime: number;
  bankAccountId: null;
  remark: null;
  netCode: null;
}
export async function openAccountInfo(
  params: { fundAccountId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResOpenAccountInfo>>(
    '/rest/csibs/account/open-account-info',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}

// 积分明细
export async function pointRevenue(
  params: API.ListParams<{ customerId: string; tradeAccountId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<RespointRevenue>>(
    '/rest/csibs/user-level/point-revenue',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      ...(options || {}),
    },
  );
}

interface RespointExpenses {
  giftName: string;
  amount: number;
  receiveDate: string;
}

// 积分兑换明细
export async function pointExpenses(
  params: API.ListParams<{ customerId: string; tradeAccountId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<RespointExpenses>>(
    '/rest/csibs/user-level/point-expenses',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      ...(options || {}),
    },
  );
}

interface ResaccOperations {
  applicationTime: number;
  businessName: string;
  confirmTime: number;
  agencyName: string;
  fundAccountId: string;
}

// 账户类特殊变更
export async function accOperations(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResaccOperations>>(
    '/rest/csibs/account/operations',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      ...(options || {}),
    },
  );
}

interface RestradeOperations {
  applicationDate: number;
  businessName: string;
  fundName: string;
  confirmDate: number;
  frozenDate: number;
  agencyName: string;
  fundAccountId: string;
  confirmVolume: number;
}

// 交易类变更
export async function tradeOperations(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<RestradeOperations>>(
    '/rest/csibs/trade/operations',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
      ...(options || {}),
    },
  );
}

export interface ResquestionnaireQuery {
  questions: Question[];
  answers: Answer[];
  evaluationTime: number;
  expirationTime: number;
}

interface Answer {
  optionId: string;
}

interface Question {
  questionnaireNo: string;
  seqquence: number;
  questionId: string;
  content: string;
  maxScore: number;
  minScore: number;
  options: Option[];
}

interface Option {
  optionId: string;
  questionId: string;
  content: string;
  score: number;
  sequence: number;
}

// 风险问卷
export async function questionnaireQuery(
  params: { customerId: string; tradeAccountId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResquestionnaireQuery>>(
    '/rest/csibs/risk-level/questionnaire/query',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}

interface TopTags {
  tagName: string;
  tagValue: string;
}
// 标签
export async function tagTopGroup(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<{ tagGroupName: string; tags: TopTags[] }>>(
    '/rest/csibs/tag/top-group',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },
  );
}

interface RestagGroups {
  tagGroups: TagGroup[];
  timestamp: string;
}

interface TagGroup {
  tagGroupName: string;
  tags: Tag[];
}

interface Tag {
  tagName: string;
  tagValue: string;
}
// 获取全部标签
export async function tagGroups(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<RestagGroups>>('/rest/csibs/tag/groups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export interface ContactMoreItem {
  source: string;
  mobile: string;
  email: string;
  postCode: string;
  address: string;
  updateTime: number;
}
// 更多联系信息
export async function contactMore(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ContactMoreItem[]>>('/rest/csibs/contact/more', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

export interface ResSystemConfigs {
  feedbackTypes: FeedbackType[];
  callTypes: FeedbackType[];
  personalPaperTypes: FeedbackType[];
  institutionalPaperTypes: FeedbackType[];
}

interface FeedbackType {
  id: string;
  name: string;
}
export async function systemConfigs(
  params: { types: string[] },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResSystemConfigs>>('/rest/csibs/system/configs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

// 获取实时交易查询url
export async function realTimeTradeUrl() {
  return request<API.Response<string>>('/rest/csibs/real-time-trade/url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 计提管理费列表
interface provisionParams {
  customerId: string;
  pageSize: number;
  page: number;
  sorting: object;
  fundCode: string;
}
interface provisionRes {
  list: any;
  filterings: any;
}
export async function provisionList(params: API.ListParams<provisionParams>) {
  return request<API.ListResponse<provisionRes>>(
    '/rest/csibs/trade/fund-management-fee/provision-list',
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

// 数据同步状态
export async function tradeTaStatus() {
  return request<API.Response<{ taName: string; ready: boolean }[]>>(
    '/rest/csibs/trade/ta-status',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface RescontactAddress {
  areaId: string;
  areaName: string;
  upAreaId: string;
  areaClass: string;
  children: RescontactAddress[];
}

// 联系信息行政区域
export async function contactAddress() {
  return request<API.Response<RescontactAddress[]>>(
    '/rest/csibs/contact/address',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}


type ResUserCurrent = {
  user: string,
  email: string,
  name: string,
}
// 当前用户信息接口
export async function userCurrent() {
  return request<API.Response<ResUserCurrent>>(
    '/rest/csibs/system/user/current',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}