import React, { memo, useEffect, useState, useMemo, useContext } from "react";
import { useForm } from "antd/es/form/Form";
import { Form, Button, Modal, Row, Col, Input, Space, Tooltip } from "antd";
import { FormItems as Item } from "@/components/FormItem";
import BaseTable from "@/components/baseTable";
import { useRequest } from 'umi';
import { CustomContext } from '@/pages/customerLayout';
import { callRecordDetail, ResCallRecordDetail, CallMessage } from '@/services/customerQuery'
import { feedbackMap, feedbackStatusMap } from "@/pages/customerLayout/customerQuery/data";
const Custer = require("@/assets/call-record-custer.png");
const Robot = require("@/assets/call-record-robot.png");
const Servise = require("@/assets/call-record-servise.png");
const System = require("@/assets/call-record-system.png");

import './index.less'

import dayjs from 'dayjs'

type Props = {
    showTelrec: boolean,
    setShowTelrec: (val: boolean) => void,
    telRecords: ResCallRecordDetail | undefined
}

enum RoleEnum {
    customer = 'customer',
    ivr = 'ivr',
    agent = 'agent',
    system = 'system'
}


const ivrIconMap = {
    [RoleEnum.agent]: Servise,
    [RoleEnum.ivr]: Robot,
    [RoleEnum.customer]: Custer,
    [RoleEnum.system]: System,
}

const ivrTipMap = {
    [RoleEnum.agent]: '人工客服',
    [RoleEnum.ivr]: '智能客服',
    [RoleEnum.customer]: '客户',
    [RoleEnum.system]: '系统',
}

const CallRecordDetail: React.FC<Props> = ({ showTelrec, setShowTelrec, telRecords }) => {
    const { callEmotionalLabel = '', fundAccountId = '-',
        customerName = '-', summaryType = '-', feedback = '-',
        email = '-', phone = '-', mobile = '-', callNumber = '-', solution = '-',
        callMessages = [], callCategories = '', callRecord = '-', callSummary = '-',
        callBusinessLabel = '', show 
    } = telRecords || {}

    const ivrItem = (ivr: CallMessage) => {
        return (
            <div className={`ivr-row${ivr.role !== RoleEnum.customer ? ' ivr-item' : ''}`} key={ivr.content}>
                <Tooltip overlayInnerStyle={{ borderRadius: 4 }} title={ivrTipMap[ivr.role as RoleEnum]}>
                    <img src={ivrIconMap[ivr.role as RoleEnum]} className="ivr-icon" alt="ivr" />
                </Tooltip>
                <div className="ivr-content" dangerouslySetInnerHTML={{ __html: dayjs(ivr.timestamp).format('YYYY-MM-DD HH:mm:ss') + '：' + ivr.content }}>
                </div>
            </div>
        )
    }

    return (
        <Modal
            open={showTelrec}
            getContainer={false}
            destroyOnClose
            width={700}
            footer={null}
            title="联络记录详情"
            onCancel={() => {
                setShowTelrec(false);
            }}
            wrapClassName={"tel-record-detail-modal"}
            className="naira-modal naira-top-linear-img"
        >
            <div className={'tel-body'} >
                <Space wrap style={{ marginBottom: 8, }}>
                    {
                    callEmotionalLabel && (
                            <div style={{ border: 'none', fontSize: 14 }} className={`header-tag-box-status ${feedbackStatusMap[callEmotionalLabel] || 'call-emotional-mid'}`}>{callEmotionalLabel}</div>
                    )
                }
                    {
                        !!callBusinessLabel?.length && callBusinessLabel?.split('、')?.map(item => (<div key={item} style={{ border: 'none', fontSize: 14 }} className={`header-tag-box-status call-busi-tag`}>{item}</div>))
                    }
                </Space>
                <Row>
                    <Col span={12}>
                        <div className="tel-desc">客户账号：{fundAccountId || '-'}</div>
                        <div className="tel-desc">客户名称：{customerName || '-'}</div>
                        <div className="tel-desc">客户反馈：{feedback || '-'}  </div>
                        <div className="tel-desc">小结类型：{{ 'auto': '自动', 'manual': '人工' }[summaryType] || '-'}  </div>
                    </Col>
                    <Col span={12}>
                        <div className="tel-desc">电子邮件：{email || '-'}  </div>
                        <div className="tel-desc">联系电话：{phone || '-'}</div>
                        <div className="tel-desc">移动电话：{mobile || '-'}  </div>
                        <div className="tel-desc">主叫号码：{callNumber || '-'}</div>
                    </Col>
                </Row>
                <div className="tel-item">
                    <div className="tel-title">
                        问题描述：
                    </div>
                    <div className="tel-content">
                        <Space size={8} wrap style={{ marginTop: 8 }}>
                            {
                                callCategories?.split(',').map(e => e.replaceAll('-', '--')).map((content, i) => (
                                    <div className="que-tag" key={content + i}><span style={{ color: '#337BFA' }}>#</span> {content}</div>
                                ))
                            }
                        </Space>
                        <div style={{ marginTop: 8 }}>{callRecord || '-'}</div>
                    </div>
                </div>
                <div className="tel-item">
                    <div className="tel-title">
                        解决办法：
                    </div>
                    <div className="tel-content">
                        {solution || '-'}
                    </div>
                </div>
                <div className="tel-item">
                    <div className="tel-title">
                        通话摘要：
                    </div>
                    <div className="tel-content">
                        {callSummary || '-'}
                    </div>
                </div>
                {
                    show && (
                        <div className="tel-item">
                            <div className="tel-title">
                                通话记录：
                            </div>
                            <div className="tel-content">
                                {
                                    !!callMessages?.length ? callMessages.map(item => ivrItem(item)) : '-'
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </Modal>
    );
};
export default memo(CallRecordDetail);
