import React from 'react'
const nodataImg = require("@/assets/nodata.png");
import './index.less'

// 默认图片78px，不同格子中，比如下拉框中图片要小点儿，使用类名覆盖大小
const customizeRenderEmpty = () => (
    <div className={'no-data-box'}>
        <img className="image-size" src={nodataImg} />
        <div className="no-data-text">暂无数据</div>
    </div>
);


export default customizeRenderEmpty