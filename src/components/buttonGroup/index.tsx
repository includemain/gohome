import React, { useState } from 'react';
import styles from './index.module.less'; // 导入CSS文件进行样式处理

type Props = {
    buttons: { label: string, value: any }[],
    onClick: (val: any) => void,
    activeValue: string
}

const ButtonGroup: React.FC<Props> = ({ buttons, onClick, activeValue }) => {

    return (
        <div className={styles.buttonGroup}>
            {buttons.map((button) => (
                <div
                    key={button.value}
                    className={`btn-tab ${button.value === activeValue ? 'active' : ''}`}
                    onClick={() => onClick(button.value)}
                >
                    {button.label}
                </div>
            ))}
        </div>
    );
};

export default ButtonGroup;
