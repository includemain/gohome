import { request } from '@umijs/max';
import { download } from '../index';

// 生成日净值短信内容
export interface FundDailyNetSms {
  msgList: string[];
}
export async function fundDailyNetSms(params: {
  customerId?: string;
  sendFundNetDate?: string;
}) {
  return request<API.Response<FundDailyNetSms[]>>(
    '/rest/csibs/synthesis/reissue-business/fund-daily-net-sms/query',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 生成交易确认邮件内容
export interface TradeComfirmation {
  content: string;
  subject: string;
}
export async function tradeComfirmation(params: {
  customerId?: string;
  confirmDate?: string;
}) {
  return request<API.Response<TradeComfirmation[]>>(
    '/rest/csibs/synthesis/reissue-business/trade-confirmation-mail/query',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000,
    },
  );
}

// 综合业务办理整体list
interface RestradeWebqueryBlacklist {
  wxBinding: WxBinding;
  webRegistration: WebRegistration;
  tradeConfirmation: TradeConfirmation;
  blackList: BlackList[];
}

interface BlackList {
  communicationMethod: string;
  groupId: number;
  updater: null;
  updateTime: null;
  acctId: string;
  custid: string;
}

interface TradeConfirmation {
  smsOpt: string;
  mailopt: string;
}

interface WebRegistration {
  registorDateTime: number;
  webQueryStatus: string;
  webQueryStatusCode: string;
}

interface WxBinding {
  bingStatus: string;
}

export async function tradeWebqueryBlacklist(params: {
  customerId: string;
  mobile: string;
  email: string;
  fundAccountId: string;
}) {
  return request<API.Response<RestradeWebqueryBlacklist>>(
    '/rest/csibs/synthesis/interface/trade-webquery-blacklist',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
interface ReqadviceUpdate {
  adviceId?: string;
  subject: string;
  content: string;
  request: string;
  urgency: string;
  adviceType: string;
  requireReplyMethod: string;
  requireReply: boolean;
  requireReplyTime: number;
  customerName: string;
  fundAccountId: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
}

// 更新投诉建议
export async function adviceUpdate(params: ReqadviceUpdate) {
  return request<API.Response<any>>('/rest/csibs/advice/update', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 创建投诉建议
export async function adviceCreate(params: ReqadviceUpdate) {
  return request<API.Response<any>>('/rest/csibs/advice/create', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 交易类型列表
export async function associateActions(params: ReqadviceUpdate) {
  return request<API.Response<any>>('/rest/csibs/account/associate/actions', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ReqassociateList {
  customerId: string;
  customerPaperNo: string;
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  actionIds: string[];
}

interface ResassociateList {
  customerName: string;
  customerPaperNo: string;
  actionName: string;
  actionChannel: string;
  actionTime: number;
}
// 关联账号查询
export async function associateList(
  params: API.ListParams<ReqassociateList>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResassociateList>>(
    '/rest/csibs/account/associate/list',
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

interface ResquestionnaireList {
  questionnaireId: string;
  questionnaireName: string;
  createUser: string;
  createTime: number;
}
// 调查问卷列表
export async function questionnaireList(
  params: API.ListParams<any>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResquestionnaireList>>(
    '/rest/csibs/questionnaire/list',
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
export interface REsNewQuestionnaireList {
  surveyId: string;
  surveyName: string;
  type: string;
  count: string;
  questionViews: QuestionView[];
  createUser: string;
  createTime: string;
  updateTime: string;
}

export interface QuestionView {
  questionId: number;
  type: string;
  content: string;
  maxSelectedOptionCount: number;
  required: boolean;
  options: QuestionViewOption[];
}

interface QuestionViewOption {
  description: string;
  enableFilling: boolean;
}
// 问卷列表新
export async function newQuestionnaireList(
  params: API.ListParams<any>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<REsNewQuestionnaireList>>(
    '/rest/csibs/survey/list',
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
interface ReqnewsurveySubmit {
  customerId: string;
  customerName: string;
  fundAccountId: string;
  customerAge: string;
  customerMobile: string;
  startTime: string;
  endTime: string;
  surveyId: number;
  answers: Answer[];
}

export interface Answer {
  questionId: number;
  type: string;
  questionAnswer: QuestionAnswer;
}

interface QuestionAnswer {
  optionAnswers?: OptionAnswer[];
  text?: string;
}

interface OptionAnswer {
  index: string;
  filling: string;
}
// 问卷提交新
export async function newsurveySubmit(params: ReqnewsurveySubmit) {
  return request<API.Response<any>>('/rest/csibs/survey/submit', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 外面查询ivr绑定状态
export async function ivrBindStatus(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/synthesis/ivr-bind/status', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface ResivrBindHistoryList {
  mobile: string;
  cardId: string;
  bindType: string;
  bindTime: string;
  unbindType: string;
  unbindTime: string;
}
// 查询IVR绑定记录
export async function ivrBindHistoryList(
  params: API.ListParams<{ customerId: string }>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<ResivrBindHistoryList>>(
    '/rest/csibs/synthesis/ivr-bind/history-list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params?.page - 1 },
      ...(options || {}),
    },
  );
}

export interface ReswxBindingInfo {
  wxTradeBindStatus: string;
  webQueryStatus: string;
  webQueryRegisterTime: string;
  customerName: string;
}
// 网上查询
export async function wxBindingInfo(params: {
  customerId: string;
  fundAccountId: string;
}) {
  return request<API.Response<ReswxBindingInfo>>('/rest/csibs/web-query/info', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 网查删除注册
export async function webQueryDelete(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/web-query/unregister', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 网查注册
interface ReqwebQueryRegister {
  customerId: string;
  // custMobile: string;
  // custName: string;
  fundAccountId: string;
}
export async function webQueryRegister(params: ReqwebQueryRegister) {
  return request<API.Response<any>>('/rest/csibs/web-query/register', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// 重置密码
export async function webResetPassword(params: {
  customerId: string;
  // custMobile: string;
  // custName: string;
}) {
  return request<API.Response<any>>('/rest/csibs/web-query/reset-password', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export interface ResivrBindList {
  mobile: string;
  cardId: string;
  bindType: string;
  bindTime: string;
  cardType: string;
}
// 查询IVR绑定记录（全量）
export async function ivrBindList(params: { customerId: string }) {
  return request<API.Response<ResivrBindList[]>>(
    '/rest/csibs/synthesis/ivr-bind/list',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 基金净值服务开通状态
export async function fundNavStatus(params: { customerId: string }) {
  return request<API.Response<{ smsFundNavEnabled: boolean }>>(
    '/rest/csibs/fund-nav/status',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface ResfundNavBookInfo {
  groups: Group[];
}

interface Group {
  fundType: string;
  fundTypeText: string;
  funds: Fund[];
}

interface Fund {
  smsBooked: boolean;
  code: string;
  name: string;
}
// 仅仅净值树
export async function fundNavBookInfo(params: { customerId: string }) {
  return request<API.Response<ResfundNavBookInfo>>(
    '/rest/csibs/fund-nav/book-info',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
interface ReqsaveBookSms {
  customerId: string;
  fundAccountId: string;
  seatId: string;
  bookedFundCodes: string[];
}
// 基金定值更新
export async function saveBookSms(params: ReqsaveBookSms) {
  return request<API.Response<ResfundNavBookInfo>>(
    '/rest/csibs/fund-nav/book-sms',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 发送日净值短信内容
export async function fundDailyNetSend(params: {
  customerId?: string;
  sendFundNetDate?: string;
}) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/fund-daily-net-sms/send',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 发送交易确认邮件
export async function tradeComfirmationSend(params: {
  confirmDate?: string;
  customerId?: string;
}) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/trade-confirmation-mail/send',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//查询全部短信模板
export interface smsTemplateQuery {
  id: string;
  parentId: string;
  remark: string[];
}
export async function smsTemplate() {
  return request<API.Response<smsTemplateQuery[]>>(
    '/rest/csibs/synthesis/reissue-business/smsTemplate/queryall',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
//查询单个模板内容
export interface smsTemplateQueryById {
  smsTemplate: string;
}
export async function smsTemplateContent(params: {
  templateId?: string;
  customerId?: string;
  custName?: string;
}) {
  return request<API.Response<smsTemplateQueryById[]>>(
    '/rest/csibs/synthesis/reissue-business/smsTemplate/queryById',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 生成短信账单
export interface smsbillQuery {
  messageList: string[];
  seqNumber: string;
}
export async function smsbill(params: {
  billDate?: string;
  fundAccountId?: string;
  customerId?: string;
}) {
  return request<API.Response<smsbillQuery[]>>(
    '/rest/csibs/synthesis/reissue-business/smsbill/query',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 短信账单发送
export async function smsbillSend(params: {
  billDate?: string;
  customerId?: string;
}) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/smsbill/send',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 生成邮件账单
export interface mailbillQuery {
  content: string;
  seqNumber: string;
}
export async function mailbill(params: {
  billDate?: string;
  fundAccountId?: string;
  customerId?: string;
}) {
  return request<API.Response<mailbillQuery[]>>(
    '/rest/csibs/synthesis/reissue-business/mailbill/query',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000,
    },
  );
}

// export async function queryList(
//   params: {
//     keyword?: string;
//     current?: number;
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.Response<ListItem>>('/api/v1/user', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// 邮件账单发送
export async function mailbillsend(params: {
  billDate?: string;
  customerId?: string;
}) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/mailbill/send',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//生成html5账单
export interface html5billQuery {
  url: string;
}
export async function html5bill(params: {
  billDate?: string;
  fundAccountId?: string;
  customerId?: string;
}) {
  return request<API.Response<html5billQuery[]>>(
    '/rest/csibs/synthesis/reissue-business/html5bill/query',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 300000,
    },
  );
}

//短信模板编辑
export interface smsTemplateEdit {
  messageList: string;
}
export async function smsTemplatePage(params: {
  content?: string;
  mobile?: string[];
}) {
  return request<API.Response<smsTemplateEdit[]>>(
    '/rest/csibs/synthesis/reissue-business/smsTemplate/page',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//短信单发发送
export async function smsTemplateSend(params: {
  message?: string;
  mobiles?: string[];
  customerId?: string;
  seatId?: string;
}) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/smsTemplate/send',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

//获取上一个工作日时间
export async function lastWorkDay(params: { lastWorkday?: string }) {
  return request<API.Response<[]>>(
    '/rest/csibs/synthesis/reissue-business/last-workday',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

interface RessystemSeatUser {
  seatId: string;
  seatName: string;
}

// 获取坐席信息
export async function systemSeatUser(params: { seatIds: string[] }) {
  return request<API.Response<RessystemSeatUser[]>>(
    '/rest/csibs/system/seat-user',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

// 查询手机号是否可以绑定ivr
export async function ivrBindCanBind(params: { mobile: string }) {
  return request<API.Response<boolean>>(
    '/rest/csibs/synthesis/ivr-bind/can-bind',
    {
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export interface ReqivrBindBind {
  customerId: string;
  mobile: string;
  cardId: string;
  cardType: string;
}
// 绑定
export async function ivrBind(params: ReqivrBindBind) {
  return request<API.Response<boolean>>('/rest/csibs/synthesis/ivr-bind/bind', {
    method: 'POST',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// ivr重置密码
export async function ivrResetPassword(params: {
  customerId: string; // 客户ID
}) {
  return request<API.Response<string>>(
    '/rest/csibs/synthesis/ivr-bind/reset-password',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

// 取消绑定
export async function ivrBindUnbind(params: {
  mobile: string; // 手机号（4.9.2提供）
  cardId: string; // 证件号（4.9.2提供）
}) {
  return request<API.Response<string>>(
    '/rest/csibs/synthesis/ivr-bind/unbind',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

export interface RessubscriptionInfo {
  subscriptionCancelled: boolean;
  smsBillSubscribed: boolean;
  emailBillSubscribed: boolean;
  paperBillSubscribed: boolean;
}

// 账单定制
export async function subscriptionInfo(params: { customerId: string }) {
  return request<API.Response<RessubscriptionInfo>>(
    '/rest/csibs/bill/subscription-info',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

interface RequpdateSubscription {
  subscriptionCancelled: boolean;
  smsBillSubscribed: boolean;
  emailBillSubscribed: boolean;
  paperBillSubscribed: boolean;
  customerId: string;
  fundAccountId: string;
  seatId: string;
}
// 账单定制提交
export async function updateSubscription(params: RequpdateSubscription) {
  return request<API.Response<any>>('/rest/csibs/bill/update-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

interface ReqblackAndWhiteListQuery {
  // mobile: string;
  // email: string;
  customerId: string;
}
interface ResblackAndWhiteListQuery {
  smsBlackLists: SmsBlackList[];
  emailBlackLists: SmsBlackList[];
  wxBlacklists: SmsBlackList[];
  whitelists: SmsBlackList[];
}

interface SmsBlackList {
  type: string;
  enabled: boolean;
}
// 黑白名单
export async function blackAndWhiteListQuery(
  params: ReqblackAndWhiteListQuery,
) {
  return request<API.Response<ResblackAndWhiteListQuery>>(
    '/rest/csibs/synthesis/black-and-whitelist/query',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
interface ReqblackAndWhiteListUpdate {
  fundAccountId: string;
  customerId: string;
  enabledWhitelistTypes: string[];
  enabledBlacklistTypes: string[];
}

// 黑名单提交
export async function blackAndWhiteListUpdate(
  params: ReqblackAndWhiteListUpdate,
) {
  return request<API.Response<any>>(
    '/rest/csibs/synthesis/black-and-whitelist/update',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

interface ReqquestionnaireDetail {
  questionnaireId: string;
  fundAccountId: string;
  customerId: string;
}

interface ResquestionnaireDetail {
  customerName: string;
  customerAge: number;
  customerMobile: string;
  fundAccountId: string;
  questionnaireName: string;
  questions: Question[];
}

export interface Question {
  index: number;
  questionId: string;
  questionType: string;
  content: string;
  optionLabelType: string;
  options?: Option[];
}

export interface Option {
  index: number;
  optionId: string;
  content: string;
  subOptionType: string;
  optionPosition: string;
  subOptionLabelType: string;
  subOptions?: SubOption[];
}

interface SubOption {
  index: number;
  subOptionId: string;
  content: string;
  subOptionPosition: string;
}
// 填写问卷详情
export async function questionnaireDetail(params: ReqquestionnaireDetail) {
  return request<API.Response<ResquestionnaireDetail>>(
    '/rest/csibs/questionnaire/detail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}

interface recordParams {
  customerId: string;
  sorting: object;
  pageSize: number;
  page: number;
}

interface recordRes {
  list: any;
  billType: string;
  processingTime: string;
  reissueContent: string;
  reissueTime: number;
  contactWay: string;
  deliverType: string;
  remark: any;
  status: string;
  sendMessage: any;
}

export async function recordQuery(params: API.ListParams<recordParams>) {
  return request<API.ListResponse<recordRes>>(
    '/rest/csibs/synthesis/reissue-business/contact-record/query',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
    },
  );
}

// 问卷调查提交
interface ReqquestionnaireSubmit {
  customerId: string;
  customerName: string;
  customerAge: number;
  customerMobile: string;
  questionnaireId: string;
  submitTime: number;
  selectedOptionIds: string[];
  selectedSubOptionIds: string[];
  questionId2Content: QuestionId2Content;
  optionId2Content: OptionId2Content;
}

interface OptionId2Content {
  ebc77db4e378: string;
}

interface QuestionId2Content {
  eb0753f4e378: string;
}
// 填写问卷详情
export async function questionnaireSubmit(params: ReqquestionnaireSubmit) {
  return request<API.Response<any>>('/rest/csibs/survey/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 退款记录查询
interface ReqrefundSearch {
  page: number;
  pageSize: number;
  startDate: string;
  endDate: string;
  fundAccountId: string;
  investorType: string;
  investor: string;
  refundUploadStatus: string;
  refundStatus: string;
}

interface FResrefundSearch {
  refundId: string;
  businessName: string;
  investor: string;
  investorType: string;
  refundDate: string;
  phone: string;
  emaill: string;
  amount: number;
  amountText: string;
  refundReason: string;
  receiverBankNumber: string;
  receiverBankName: string;
  updateTime: string;
  refundStatus: string;
  refundStatusText: string;
  refundUploadStatus: string;
  refundUploadStatusText: string;
  remark: null;
}
export async function refundSearch(
  params: API.ListParams<ReqrefundSearch>,
  options?: { [key: string]: any },
) {
  return request<API.ListResponse<FResrefundSearch>>(
    '/rest/csibs/trade/refund/search',
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

// 导出退款记录
export async function searchExport(params: { jobId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/trade/refund/search-export',
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
// 屏蔽组
export async function shieldGroupQuery(params?: any) {
  return request<API.Response<any>>('/rest/csibs/synthesis/shield-group/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 投诉建议分类
export async function adviceCategories(params?: any) {
  return request<API.Response<any>>('/rest/csibs/advice/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

// 投诉建议分类
export async function surveyDetail(params?: any) {
  return request<API.Response<any>>('/rest/csibs/survey/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}