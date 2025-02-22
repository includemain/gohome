import React from 'react'
import type { ModalFuncProps } from 'antd'
import AntdIcon from '@ant-design/icons'
import { Modal } from 'antd'
import warnIcon from '@/assets/confirm-modal-warn.png'
// import SentIcon from '@/assets/mod_confirm_sentIcon.svg'
// import { modal } from '@/App'

export const deleteModal = (props: ModalFuncProps & { contentStatus?: boolean }) => {
    const { title, content, contentStatus, icon } = props
    return Modal.confirm({
        okText: '确定',
        cancelText: '取消',
        wrapClassName: 'delete-modal-content',
        title,
        closable: true,
        width: 300,
        onOk() { },
        onCancel() { },
        ...props,
        icon: icon || null,
        content: props.content ? (
            <div style={{
                fontFamily: 'PingFangSC-Medium',
                fontWeight: 500,
                fontSize: 16,
                color: '#333333',
                lineHeight: '24px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <img src={warnIcon} alt="warn" style={{ width: 24, height: 24, marginRight: 16 }} />
                <span>{content}</span>
            </div>
        ) : (
            ''
        )
    })
}
