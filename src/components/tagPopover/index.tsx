import { Popover, TreeSelect, Upload, Row, DatePicker, Space } from "antd";
import React, { memo, useContext, useState, useMemo, useEffect, useLayoutEffect, useRef } from "react";
import moment from 'moment'
import lodash from 'lodash'
import styles from './index.module.less'

const Tagtem = ({ str = '' }) => {
    return (
        <div className="tag-item">
            <span className="text">{str}</span>
        </div>
    )
}

type Props = {
    tags: string[],
    boxWidth: number
}

const TagPopover: React.FC<Props> = ({ tags = [], boxWidth = 200 }) => {
    const tagRef = useRef<HTMLElement | null | undefined>()
    const [cellTag, setCellTag] = useState(tags)
    const [popTag, setPopTag] = useState([])

    const popoverDom = (
        <Space size={[8, 8]} wrap style={{ maxWidth: 400 }}>
            {
                tags.map(item => <Tagtem key={item} str={item}></Tagtem>)
            }
        </Space>
    )

    useLayoutEffect(() => {
        if (!tagRef.current) return
        // const hetght = tagRef.current?.offsetHeight
        const tagItemDom = tagRef.current?.getElementsByClassName('tag-item') || []
        let curWidth = 0
        let curRows = 1
        Array.from(tagItemDom).forEach((item, index) => {

            if (curRows > 2) return
            // 如果是第一行第一个，直接计算宽度
            if (index === 0) {
                curWidth = item.offsetWidth
            } else {
                // 如果是第二行，需要判断，将...也加上
                if (curWidth + item.offsetWidth + 8 > boxWidth) {
                    curRows++
                    const lastRowElipise = curRows === 2 ? 24 : 0
                    curWidth = item.offsetWidth + lastRowElipise
                } else {
                    curWidth = curWidth + item.offsetWidth + 8
                }
            }


            if (curRows === 3) {
                const cloneTags = lodash.cloneDeep(tags)
                const otherTag = cloneTags.splice(index)
                setCellTag(cloneTags)
                setPopTag(otherTag)
            }
        })
    }, [tags])

    if (!tags.length) return '-'
    return (
        <div className={styles.tagPopover} ref={tagRef}>
            <Popover arrowPointAtCenter overlayClassName="popover-container tag-busi-popover" placement="bottomLeft" content={popTag.length ? popoverDom : ''}>
                <Space size={[8, 8]} wrap>
                    {
                        cellTag.map(item => <Tagtem key={item} str={item}></Tagtem>)
                    }
                    {
                        !!popTag.length && <span className="more-desc">...</span>
                    }
                </Space>

            </Popover>
        </div>
    )
}

export default TagPopover