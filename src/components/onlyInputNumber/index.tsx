import { Input, Tooltip } from 'antd';
import React, { useState } from 'react';

// 旧版本浏览器，银行卡号会出现精度丢失的问题，使用字符串模拟数字
const OnlyInputNumber: React.FC = ({ value, onChange, ...rest }) => {
    // const [nameInput, setNameInput] = useState('')

    return <Input
        placeholder={'请输入'}
        style={{ width: 310 }}
        onChange={(e) => {
            const val = e.target.value
            const reg = /^\d*$/g
            if (reg.test(val)) {
                onChange(val)
            }
        }}
        value={value}
        {...rest}
    />
};
export default OnlyInputNumber