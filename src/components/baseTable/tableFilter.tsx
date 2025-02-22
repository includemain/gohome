import type { TreeDataNode, TreeProps } from 'antd';
import { Tree, Input } from 'antd';
import lodash from 'lodash';
import { useAsyncEffect, useDebounceEffect } from 'ahooks'
import React, { useEffect, useState } from 'react';
import { loopFormatFilter } from './index'
interface Props {
  setFilter: (val: React.Key[]) => void,
  treeOptions: TreeDataNode[],
  filterMultiple: boolean,
  // resetFilter: () => void,
  filterData: React.Key[] | React.Key,
  filterSearch: boolean | ((val: string, options: TreeDataNode[]) => TreeDataNode[]),
  filterEnterSearch: boolean | ((val: string, options: TreeDataNode[]) => TreeDataNode[]),
  isCancelFilter?: boolean,
  removeFiltersOnCancelFilter?: boolean,
  setKeyWords: (val: string) => void,
  keyWords: string
}

const App: React.FC<Props> = ({ setFilter, filterData, treeOptions, filterMultiple = true, filterSearch,
  removeFiltersOnCancelFilter,
  filterEnterSearch, isCancelFilter,
  setKeyWords, keyWords
}) => {
  // let isShowTreeDom = isCancelFilter
  const newFilterData = lodash.isArray(filterData) ? filterData : filterData ? [filterData] : []

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>();
  //   const [checkedKeys, setCheckedKeys] = useState<React.Key[]>();
  // const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [filterOptions, setFilterOptions] = useState<TreeDataNode[]>(treeOptions);
  // const [keyWords, setKeyWords] = useState<string>();


  // 展示搜搜项时，默认本地筛选
  const defaultFilterOptionAction = (val: string, options: TreeDataNode[]): TreeDataNode[] => {
    const cloneOptions = lodash.cloneDeep(options)
    const expandkey = new Set<React.Key>()
    const filters = cloneOptions.filter(item => {

      const isItemShow = String(item.title).toLowerCase()?.includes(val.toLowerCase())

      item.children = defaultFilterOptionAction(val, lodash.cloneDeep(item.children) || [])
      if (item.children?.length > 0) {
        expandkey.add(item.key)
      }

      return isItemShow || item.children?.length
    })

    // 搜索时展开树,树的时候，设置下面的filterMode为tree，然后将这里放开，再改改tree时的样式
    setTimeout(() => {
      // setExpandedKeys([...expandkey]);
    }, 0);

    return filters
  }


  const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue) => {
    setFilter(checkedKeysValue as React.Key[]);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeysValue) => {
    setFilter(selectedKeysValue as React.Key[]);
  };

  const filterOnchange = async (val) => {
    setKeyWords(val.target.value)
  }
  // 按下回车时的回调
  const filterOnEnter = async () => {
    // 默认情况，本地搜索
    if (filterEnterSearch === true) {
      setFilterOptions(defaultFilterOptionAction(keyWords || '', treeOptions))
    } else if (typeof filterEnterSearch === 'function') {
      // 掉接口时
      const originRes = await filterEnterSearch?.(keyWords || '', treeOptions)
      setFilterOptions(originRes.map(loopFormatFilter))
      if (originRes.length !== 0) {
        setKeyWords('')
      }
    }
  }
  const filterMode = 'menu'

  // 加粉中定制需求，先不考虑复用
  useEffect(() => {
    if (isCancelFilter) {
      setFilterOptions([])
    }
  }, [isCancelFilter])

  const searchOnKeyWordsChange = async () => {
    if (filterSearch === true) {
      setFilterOptions(defaultFilterOptionAction(keyWords || '', treeOptions))
    } else if (typeof filterSearch === 'function') {
      // 掉接口时
      const originRes = await filterSearch?.(keyWords || '', treeOptions)
      setFilterOptions(originRes.map(loopFormatFilter))
    }
  }

  useDebounceEffect(() => {
    // 默认情况，本地搜索
    searchOnKeyWordsChange()
    // 如果是重置时
    if (lodash.isUndefined(keyWords)) {
      filterOnEnter()
    }
  }, [keyWords], {
    wait: 500,
  })



  return (
    <div className={`base-table-filter-dropdown${filterMode === 'menu' ? ' table-filter-menu' : ' table-filter-tree'}`}>

      {
        (filterSearch || filterEnterSearch) && <Input value={keyWords} onChange={filterOnchange} onPressEnter={filterOnEnter} allowClear placeholder="请输入" />
      }
      {
        (filterOptions?.length > 0) ? (
          <Tree
            checkable={filterMultiple}
            onExpand={onExpand}
            multiple={filterMultiple}
            expandedKeys={expandedKeys}
            blockNode={true}
            // switcherIcon={<span></span>}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={newFilterData}
            onSelect={onSelect}
            selectedKeys={newFilterData}
            treeData={filterOptions}
            key={keyWords}
          />
        ) : (
          <div className="filter-empty">暂无数据</div>
        )
      }

    </div>

  );
};

export default App;