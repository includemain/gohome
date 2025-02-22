import { request } from '@umijs/max';
import { download } from '../index';
//投资推广指南列表
interface PromotionListParams {
  customerId: string;
}
interface PromotionInfo {
  promotionName: string;
  content: string;
  verbalTrick: string;
  creator: string;
  creationTime: string;
  fundCodes: string[];
}
export async function assistantList(
  params: API.ListParams<PromotionListParams>,
) {
  return request<API.ListResponse<PromotionInfo>>(
    '/rest/csibs/promotion/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//推广点使用历史
interface PromotionHistoryParams {
  customerId: string;
  page: number;
  pageSize: number;
  promotionType: string;
}
interface PromotionHistoryInfo {
  list: any;
}
export async function promotionHistory(
  params: API.ListParams<PromotionHistoryParams>,
) {
  return request<API.ListResponse<PromotionHistoryInfo>>(
    '/rest/csibs/promotion/history',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
    },
  );
}

//单一推广使用历史
interface PromotionSoleHistoryParams {
  customerId: string;
  promotionType: string;
}
interface PromotionSoleHistoryInfo {
  list: any;
}
export async function promotionSoleHistory(
  params: API.ListParams<PromotionSoleHistoryParams>,
) {
  return request<API.ListResponse<PromotionSoleHistoryInfo>>(
    '/rest/csibs/promotion/sole-history',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params, page: params.page - 1 },
    },
  );
}

//季度持仓行业报告
interface IndustryDistributionParams {
  customerId: string;
}
interface IndustryDistributionInfo {
  data: any;
}
export async function industryDistribution(
  params: API.ListParams<IndustryDistributionParams>,
) {
  return request<API.ListResponse<IndustryDistributionInfo>>(
    '/rest/csibs/promotion/industry-distribution',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//季度持仓行业前五
interface TopFiveParams {
  customerId: string;
}
interface TopFiveInfo {
  data: any;
}
export async function topFive(params: API.ListParams<TopFiveParams>) {
  return request<API.ListResponse<TopFiveInfo>>(
    '/rest/csibs/promotion/top-five-industry-distribution',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询持仓基金投资情报
interface HoldFundParams {
  customerId: string;
  fundCode: string;
}
interface HoldFundInfo {
  data: any;
}
export async function holdFund(params: API.ListParams<HoldFundParams>) {
  return request<API.ListResponse<HoldFundInfo>>(
    '/rest/csibs/promotion/holding-fund-investment/info',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询推荐基金
interface RecommendFundInfo {
  data: any;
}
export async function recommendFund(params: API.ListParams<{}>) {
  return request<API.ListResponse<RecommendFundInfo>>(
    '/rest/csibs/promotion/recommended-fund',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询相似基金
interface SimilarFundParams {
  customerId: string;
}
interface SimilarFundInfo {
  data: any;
}
export async function similarFundList(
  params: API.ListParams<SimilarFundParams>,
) {
  return request<API.ListResponse<SimilarFundInfo>>(
    '/rest/csibs/promotion/similar-fund/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询单个相似基金
interface SimilarFundOneParams {
  customerId: string;
  fundCodes: string[];
}
interface SimilarFundOneInfo {
  data: any;
}
export async function similarFundOne(
  params: API.ListParams<SimilarFundOneParams>,
) {
  return request<API.ListResponse<SimilarFundOneInfo>>(
    '/rest/csibs/promotion/similar-fund/one',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询持仓收益
interface IncomRiseFailparams {
  customerId: string;
  fundCodes: string[];
}
interface IncomRiseFailInfo {
  data: any;
}
export async function incomRiseFail(
  params: API.ListParams<IncomRiseFailparams>,
) {
  return request<API.ListResponse<IncomRiseFailInfo>>(
    '/rest/csibs/promotion/income-rise-fall/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//生日推广点详情
export async function birthday(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/promotion/birthday', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
//持仓收益超10%
interface IncomRiseFailparams {
  customerId: string;
  sorting: any;
}
interface IncomRiseFailInfo {
  data: any;
}
export async function gainOver(params: API.ListParams<IncomRiseFailparams>) {
  return request<API.ListResponse<IncomRiseFailInfo>>(
    '/rest/csibs/promotion/gain-over-10',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//持仓收益超-10%
interface IncomRiseFailparams {
  customerId: string;
  sorting: any;
}
interface IncomRiseFailInfo {
  data: any;
}
export async function lossOver(params: API.ListParams<IncomRiseFailparams>) {
  return request<API.ListResponse<IncomRiseFailInfo>>(
    '/rest/csibs/promotion/loss-over-10',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}

//查询持仓季报或不定期汇报
export async function fundContent(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/income-rise-fall/fund-content',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//单一行业占比超30%推广点详情
export async function singleIndustry(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/more-30-single-industry',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//点击推广点
export async function clickCount(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/promotion/click-count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
//使用推广点
export async function usePromotionPoint(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/use-promotion-point',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//持仓基金最新资讯
export async function lastestConsultation(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/latest-consultation',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//相似基金弹窗
export async function similarFund(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/promotion/similar-fund', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
//持仓基金投资情报
export async function holdingList(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/holding-fund-investment/list',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//查询推广点详情的持仓季报或不定期汇报
export async function incomeReport(params: { customerId: string }) {
  return request<API.Response<any>>(
    '/rest/csibs/promotion/income-rise-fall/report',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
    },
  );
}
//推广点历史查询
interface RecommendFundInfo {
  data: any;
}
export async function queryCount(params: API.ListParams<{}>) {
  return request<API.ListResponse<RecommendFundInfo>>(
    '/rest/csibs/promotion/use-promotion-point/query-count',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
//查询使用人员筛选
export async function userList(params: { customerId: string }) {
  return request<API.Response<any>>('/rest/csibs/promotion/user/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}
//推广点历史查询
interface RecommendFundInfo {
  data: any;
}
export async function queryDetail(params: API.ListParams<{}>) {
  return request<API.ListResponse<RecommendFundInfo>>(
    '/rest/csibs/promotion/use-promotion-point/detail',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { ...params },
    },
  );
}
// 推广点使用导出
export async function searchExport(params: { jobId: string }) {
  const response = await request<API.Response<any>>(
    '/rest/csibs/promotion/use-promotion-point/export',
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
