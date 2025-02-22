import React, { StyleHTMLAttributes } from 'react'
import { Spin } from 'antd'
const nodataImg = require("@/assets/nodata.png");
import './index.less'

// 默认图片78px，不同格子中，比如下拉框中图片要小点儿，使用类名覆盖大小
type Props = {
    rootStyle?: StyleHTMLAttributes;
    loadingStyle: StyleHTMLAttributes;
}
const Customizeloading: REact.FC<Props> = ({ rootStyle = {}, loadingStyle = {} }) => (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', ...rootStyle, }}>
        <Spin size="large" style={loadingStyle} />
    </div>
);


export default Customizeloading