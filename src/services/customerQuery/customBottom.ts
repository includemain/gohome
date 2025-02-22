import { request } from '@umijs/max';
import { download } from '../index';

interface RcallRecordList {
  seatUserName: string;
  acceptTime: number;
  callNumber: string;
  callRecordType: string;
  problem: string;
  solution: string;
  customerName: string;
  fundAccountId: string;
  customerEmail: string;
  feedback: string;
  callId: string;
}

// 联络表格
export async function callRecordList(
  params: API.ListParams<{ customerId: string; callNumber?: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<RcallRecordList>>(
    '/rest/csibs/call-record/list',
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

// 综合mot
interface RmotReplays {
  motNodeName: string;
  tts: string;
}

// 联络表格
export async function motReplays(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<RmotReplays>>('/rest/csibs/mot/replays', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, page: params.page - 1 },
    ...(options || {}),
  });
}

export interface ResCallRecordDetail {
  callEmotionalLabel: string;
  callBusinessLabel: string;
  fundAccountId: string;
  customerName: string;
  phone: string;
  email: string;
  feedback: string;
  mobile: string;
  callNumber: string;
  summaryType: string;
  callCategories: string;
  callRecord: string;
  callSummary: string;
  callMessages: CallMessage[];
  solution: string;
}

export interface CallMessage {
  timestamp: number;
  role: string;
  content: string;
}

// 联络表格detail
export async function callRecordDetail(
  params: { callId: string; source: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResCallRecordDetail>>(
    '/rest/csibs/call-record/detail',
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

interface ResCommissionCounts {
  totalCount: number;
  commissionCounts: CommissionCount[];
}

interface CommissionCount {
  commissionType: string;
  count: number;
}
// 业务办理情况
export async function commissionCounts(
  params: { customerId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResCommissionCounts>>(
    '/rest/csibs/commission/counts',
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

// 固定业务列表

type ReqCommissionList = {
  customerId: string;
  startTime?: string;
  endTime?: string;
  commissionTypes?: string[];
  commissionStatuses?: string[];
};

export interface ResCommissionList {
  commissionType: string;
  commissionChannel: string;
  commissionStatus: string;
  fundAccountId: string;
  uploadTime: number;
  commissionId: string;
}
export async function commissionList(
  params: API.ListParams<ReqCommissionList>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResCommissionList>>(
    '/rest/csibs/commission/list',
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

// 固定业务详情表格里的查看
export interface ResCommissionDetail {
  commissionType: string;
  fundAccountId: string;
  applicationMobile: null;
  customerMobile: string;
  customerPaperType: string;
  customerPaperTypeText: string;
  customerPaperNo: string;
  customerPaperNoExpire: boolean;
  customerPaperExpireTime: number;
  remark: string;
  bankCode: string;
  bankName: string;
  customerPaperNo18: string;
  bankAccountId: string;
  bankAccountIdNew: string;
  customerNameNew: string;
  customerPaperTypeIdNew: string;
  customerPaperNoNew: string;
  sendBack: string;
  files: File[];
  approves: Approve[];
  nttAssignees: NttAssignee[];
  nttAssignerShareInfos: NttAssignerShareInfo[];
}

interface NttAssignerShareInfo {
  fundAccountId: string;
  agencyCode: string;
  agencyName: string;
  holdShares: number;
  fundCode: string;
  fundName: string;
}

interface NttAssignee {
  name: string;
  fundAccountId: string;
  paperNo: string;
  agencyCode: string;
  agencyName: string;
  directSalesChannel: string;
}

interface Approve {
  auditorName: string;
  status: string;
  reviewTime: number;
  remark: null;
}

interface File {
  path: string;
  filename: string;
}
export async function commissionDetail(
  params: { customerId: string; commissionId: string },
  options?: { [key: string]: any },
) {
  return request<API.Response<ResCommissionDetail>>(
    '/rest/csibs/commission/detail',
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

//资产证明列表
interface ReqassetProofList {
  fundAccountId: string;
  customerName: string;
  customerPaperNo: string;
  status: string;
  startTime: number;
  endTime: number;
}
interface ResassetProofList {
  applicationTime: string;
  fundAccountId: string;
  customerName: string;
  customerNameEn: string;
  netValueDate: string;
  status: string;
  operator: string;
  deliveryType: string;
  customerContact: null;
  remark: null;
  sendTime: string;
}
export async function assetProofList(
  params: API.ListParams<ReqassetProofList>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResassetProofList>>(
    '/rest/csibs/commission/asset-proof/list',
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

// 盖章对账单列表

interface ReqBillStampingList {
  fundAccountId: string;
  customerPaperNo: string;
  customerName: string;
  startTime: number;
  endTime: number;
  status: string;
}

interface ResBillStampingList {
  applicationTime: string;
  fundAccountId: string;
  customerName: string;
  receiveTime: string;
  status: string;
  operator: string;
  deliveryType: string;
  customerContact: string;
  sendTime: null;
  remark: null;
  deliveryNo: null;
}
export async function billStampingList(
  params: API.ListParams<ReqBillStampingList>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResBillStampingList>>(
    '/rest/csibs/commission/bill-stamping/list',
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

// 快赎失败业务列表
interface ResQuickRedeemFailureList {
  tradeAccountId: string;
  customerName: string;
  applicationTime: number;
  transferTime: number;
  trustChannel: string;
  transferAmount: number;
  transferStatus: string;
  transferMessage: string;
  bankAccountId: string;
}
export async function quickRedeemFailureList(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResQuickRedeemFailureList>>(
    '/rest/csibs/commission/quick-redeem-failure/list',
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

export interface ResrefundList {
  currency: string;
  oldBusinessAccount: string;
  refundStatus: string;
  trustChannelName: string;
  totalAmount: number;
  remark: string;
  investor: string;
}
// 直销退款客户名单查询
export async function refundList(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResrefundList>>(
    '/rest/csibs/trade/refund/list',
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

export async function billHistory(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResrefundList>>('/rest/csibs/bill/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, page: params.page - 1, pageSize: 99 },
    ...(options || {}),
  });
}

interface ReqassetProofApply {
  customerNameCh: string;
  customerNameEn: string;
  netValueDate: string;
  deliveryType: string;
  recipient: string;
  address: string;
  postCode: string;
  email: string;
  mobile: string;
  fax: string;
  remark: string;
  fundAccountId: string;
  customerId: string;
  seatId: string;
}
// 资产证明提交
export async function assetProofApply(
  params: ReqassetProofApply,
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>(
    '/rest/csibs/commission/asset-proof/apply',
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

interface ReqbillStampingApply {
  customerName: string;
  startDate: string;
  endDate: string;
  deliveryType: string;
  recipient: string;
  address: string;
  postCode: string;
  email: string;
  mobile: string;
  fax: string;
  remark: string;
  fundAccountId: string;
  customerId: string;
  seatId: string;
}
// 盖章对账单提交
export async function billStampingApply(
  params: ReqbillStampingApply,
  options?: { [key: string]: any },
) {
  return request<API.Response<any>>(
    '/rest/csibs/commission/bill-stamping/apply',
    {
      skipErrorHandler: true,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
      ...(options || {}),
    },

  );
}

// 固定业务文件下载
export async function commissionDownload(params: { commissionFileId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/commission/download',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
      data: params,
      getResponse: true,
      timeout: 60000,
      skipErrorHandler: true
    },
  );
  return download(response);
}

// 微信对账单发送内容
export interface smsbillQuery {
  wxBillContent: string;
}
export async function wxbillDetail(params: {
  billDate?: string;
  fundAccount?: string;
  billType?: string;
}) {
  return request<API.Response<smsbillQuery[]>>(
    '/rest/csibs/bill/wx-bill-detail',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 短信对账单发送内容
export interface smsbillQuery {
  smsBillContent: string;
}
export async function smsbillDetail(params: {
  billDate?: string;
  customerId?: string;
  billType?: string;
}) {
  return request<API.Response<smsbillQuery[]>>(
    '/rest/csibs/bill/sms-bill-detail',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 邮件对账单发送内容
export interface smsbillQuery {
  mailBillContent: string;
}
export async function mailbillDetail(params: {
  billDate?: string;
  customerId?: string;
  billType?: string;
}) {
  return request<API.Response<smsbillQuery[]>>(
    '/rest/csibs/bill/mail-bill-detail',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}


interface RestrustChannels {
  trustChannelId: string;
  trustChannelName: string;
}
// 退款登记 - 支付渠道
export async function trustChannels(params: {
  oldBusinessAccount: string;
}) {
  return request<API.Response<RestrustChannels[]>>(
    '/rest/csibs/trade/refund/trust-channels',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ReqbatchUpdateAccounts {
  currencyTypeId: string;
  oldBusinessAccount: string;
  refundStatus: string;
  trustChannelId: string;
  refundId: string
}
interface ResbatchUpdateAccounts {
  tradeAccountId: string;
  trustChannels: TrustChannel[];
  trustChannelId: string
}

interface TrustChannel {
  trustChannelId: string;
  trustChannelName: string;
}
// 登记获取退款渠道
export async function batchUpdateAccounts(params: ReqbatchUpdateAccounts) {
  return request<API.Response<ResbatchUpdateAccounts>>(
    '/rest/csibs/trade/refund/trade-account',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ResrefundReceiverInfo {
  receiverName: string;
  receiverBankNumber: string;
}
// 选择支付渠道后调接口
export async function refundReceiverInfo(params: {
  "tradeAccountId": string,
  "trustChannelId": string
}) {
  return request<API.Response<ResrefundReceiverInfo>>(
    '/rest/csibs/trade/refund/receiver-info',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}


interface ResrefundCities {
  provinceCode: string;
  cityCode: string;
  cityName: string;
}
// 退款登记 - 城市
export async function refundCities(params: {
  provinceCode: string;
}) {
  return request<API.Response<ResrefundCities[]>>(
    '/rest/csibs/trade/refund/cities',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ResrefundProvinces {
  provinceCode: string;
  provinceName: string;
}
// 退款登记 - 省份
export async function refundProvinces() {
  return request<API.Response<ResrefundProvinces[]>>(
    '/rest/csibs/trade/refund/provinces',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ReqrefundBatchUpdate {
  currencyTypeId: string;
  oldBusinessAccount: string;
  refundStatus: string;
  trustChannelId: string;
  refundProvinceCode: string;
  refundCityCode: string;
  receiverName: string;
  receiverBankNumber: string;
  receiverBankName: string;
}
// 批量修改登记
export async function refundBatchUpdate(params: ReqrefundBatchUpdate) {
  return request<API.Response<any>>(
    '/rest/csibs/trade/refund/batch-update',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 修改登记
interface ResrefundUpdate {
  refundId: string;
  trustChannelId: string;
  refundProvinceCode: string;
  refundCityCode: string;
  receiverName: string;
  receiverBankNumber: string;
  receiverBankName: string;
}
export async function refundUpdate(params: ResrefundUpdate) {
  return request<API.Response<any>>(
    '/rest/csibs/trade/refund/update',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ReqrefundDetailList {
  currencyTypeId: string;
  oldBusinessAccount: string;
  refundStatus: string;
  trustChannelId: string;
  customerId: string;
}
export interface ResrefundDetailList {
  refundId: string;
  salesPoint: string;
  refundDate: string;
  businessName: string;
  investor: string;
  investorType: string;
  oldBusinessAccount: string;
  amount: number;
  refundReason: string;
  newBusinessAccount: string;
  receiverName: string;
  receiverBankNumber: string;
  receiverBankName: string;
  switchBuyMethod: boolean;
  paymentAccountId: null;
  retry: boolean;
  refundStatus: string;
  refundStatusText: string;
  remark: null;
  registrationChannel: string;
  trustChannelId: string;
  refundProvinceCode: string;
  refundCityCode: string;
}

// 退款详情列表
export async function refundDetailList(
  params: API.ListParams<ReqrefundDetailList>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResrefundDetailList>>('/rest/csibs/trade/refund/detail-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { ...params, page: params.page - 1 },
    ...(options || {}),
  });
}

