import { Popover, TreeSelect, Upload, Row, DatePicker } from "antd";
import React, { memo, useContext, useState, useMemo, useEffect, useRef } from "react";
import moment from 'moment'
import lodash from 'lodash'


const DescItem = ({ str = '' }) => {
    return (
        <div className="desc-item">
            {/* <span className="identify">#</span> */}
            <div className="text">{str}</div>
        </div>
    )
}

const QuestionDesc: React.FC<any> = ({ record }) => {
    const { problem = '', category = '' } = record
    if (!problem && !category) return '-'

    const descArr = !!category ? category?.split(',').map(e => e.replaceAll('-', '--')) : []
    const cellDesc = descArr.slice(0, 2) || []

    const problemDom = <div className="problem">{problem}</div>

    const popoverDom = (
        <div>
            {descArr.map(item => <DescItem key={item} str={item}></DescItem>)}
            {problem && problemDom}
        </div>
    )

    return (
        <div>
            {/* <Popover open={false} overlayStyle={{ maxWidth: '100%' }} arrowPointAtCenter overlayClassName="popover-container question-desc-popover" placement="bottomLeft" content={descArr.length > 2 ? popoverDom : ''}> */}
            {/* <div> */}
            {
                !!descArr?.length && descArr.map(item => <DescItem key={item} str={item}></DescItem>)
            }
            {/* </div> */}
            {/* </Popover> */}
            {
                problem && problemDom
            }
        </div>
    )
}

export default QuestionDesc