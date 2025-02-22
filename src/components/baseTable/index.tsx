import type { PaginationProps, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { Pagination, Table, Form, Space, Button } from 'antd';
import lodash from 'lodash';
import React, { ReactElement, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import TableFilter from './tableFilter';
import type { FormProps } from 'antd';
const nodataImg = require("@/assets/nodata.png");
const tableFilter = require("@/assets/table-filter.png");
const tableFilterActive = require("@/assets/table-filter-active.png");

import styles from './index.module.less';

interface Props<T extends object> extends TableProps<T> {
  columns: ColumnType<T>[],
  loading: boolean,
  getData?: (val: any) => void, // 获取数据的方法
  dataSource: T[],
  total?: number, // 表格数量
  pagination?: PaginationProps, // 控制分页，同antd文档，使用current代表第几页
  paginationMap?: { current?: string, pageSize?: string }, // 分页映射，比如请求接口时用page代表第几页，就{current: 'page'}
  isShowPagination?: boolean, // 是否显示分页
  scroll?: Partial<{ x: string | number | true, y: string | number, scrollToFirstRowOnChange: boolean }> // 同antd中表格scroll
  isDependOnParent?: boolean;
  isFirstRun?: boolean, // 第一次加载是否获取数据
  formChildren?: ReactElement, // 如果存在表单搜索，这里传递表单项的jsx
  extra?: ReactElement, // 有表单时，或者没有表单时的，最右侧的dom，比如导出按钮
  emptyTdDefault?: string, // 当表格没有render自定义时，值为空时默认显示的字符串 如 --
  searchFormParams?: FormProps & {
    // resetTable: { filterInfo: Record<string, React.Key[] | React.Key>, sortInfo: Record<string, string>, pageInfo: PaginationProps },
    customResetForm?: any,
    onSearchBtnClick?: () => void
  },
  rowKey?: any;
} 

// 转换filter数据的公共方法
export const loopFormatFilter = (e: any) => {
  return {
    title: e.text,
    key: e.value,
    children: e.children?.map(loopFormatFilter)
  }
}

// 这里的T是使用表格组件时，传进来的表格一行中所有的字段类型
function BaseTable<T extends object>(props: Props<T>, ref: React.Ref<any>) {
  const {
    columns = [],
    loading = false,
    getData,
    dataSource,
    total,
    pagination = { current: 1, pageSize: 10 },
    paginationMap,
    scroll = { x: 1000, y: 400 },
    isDependOnParent = false,
    isShowPagination = true,
    isFirstRun = true,
    formChildren,
    extra,
    emptyTdDefault = '-',
    searchFormParams = {},
    ...rest
  } = props
  const { onSearchBtnClick } = searchFormParams
  // 默认筛选的字段提取出来
  const defaultFilterObj: Record<string, string> = {}
  columns.forEach(item => {
    if (item.filters && item.defaultFilteredValue) {
      const multiple = item.filterMultiple ?? true
      defaultFilterObj[item.dataIndex] = multiple ? [item.defaultFilteredValue] : item.defaultFilteredValue
      item.defaultFilteredValue = undefined
    }
  })
  const [form] = Form.useForm();
  const [paginationParams, setPaginationParams] = useState<PaginationProps>(isShowPagination ? lodash.pick(pagination, 'current', 'pageSize') : {});
  const [filteredInfo, setFilteredInfo] = useState<Record<string, React.Key[] | React.Key>>(defaultFilterObj);
  const [filterKeyWords, setFilterKeyWords] = useState<Record<string, string>>({});
  const [sortInfo, setSortInfo] = useState<Record<string, string>>({});
  const isFirstRunRef = useRef(true)

  // 获取表格数据
  const getTableData = async (formData: Record<string, any> = {}) => {

  // 如果有查询参数，page不重置
    const page = {
      [paginationMap?.current || 'current']: paginationParams.current || 1,
      [paginationMap?.pageSize || 'pageSize']: paginationParams.pageSize || 10,
    }
    await getData?.({ ...page, ...filteredInfo, ...sortInfo, ...formData || {} })
  }

  // 获取搜索表单数据
  const submitFormData = async () => {
    const val = await form.validateFields()
    getTableData(val)
  }

  useEffect(() => {
    if (isFirstRunRef.current && !isFirstRun) {
      isFirstRunRef.current = false
      return
    }

    // 如果没有表单，在这里获取数据，如果有表单，在表单那里掉接口，否则表单默认数据拿不到
    if (!formChildren) {
      getTableData()
    } else {
      submitFormData()
    }
  }, [paginationParams, filteredInfo, sortInfo])


  const handleTableChange: TableProps<T>['onChange'] = (page, filters, sorter: any) => {
    // 排序、分页都会进入这里，排序时，需要将page分页重置
    const sort = { [sorter.field]: sorter.order }
    setSortInfo((pre) => {
      // 首次进入页面，第一次调接口一定会进入这里，只有第一次进入，pre是空，不管先点击的排序还是先分页，page都是准的
      // 其他情况，则通过isEqual来判断是分页还是排序，是分页时，直接返回pre，不触发依赖更新
      if (lodash.isEqual(sort, pre)) {
        return pre
      }
      setPaginationParams(isShowPagination ? (lodash.isEmpty(pre) ? page : pagination) : {})
      return sort
    })
  };

  const fColumns: ColumnType<T>[] = columns?.map(item => {
    const rowFieldLabel = item.dataIndex

    // 筛选
    if (item.filters && lodash.isArray(item.filters)) {
      item.filterMultiple = item.filterMultiple ?? true
      const rowFieldValue = filteredInfo[rowFieldLabel]

      item.onFilterDropdownOpenChange = (open) => {
        if (!open && item.removeFiltersOnCancelFilter) {
          item.isCancelFilter = false
        }
      }

      item.filterDropdown = () => {

        const filterOptions = item.filters?.map(loopFormatFilter)
        // 用于判断选择时是否有选中变为取消

        const setFilter = (val: React.Key[]) => {
          setFilteredInfo((pre) => {
            // 如果是单选，选中后关闭下拉框
            if (!item.filterMultiple) {
              setTimeout(() => {
                // const f = document.querySelectorAll('.ant-table-filter-trigger.active.ant-dropdown-open')
                const f = document.querySelectorAll('.ant-table-filter-trigger.ant-dropdown-open')
                f.forEach(e => {
                  e.click()
                })
              }, 100);
            }
            if (item.removeFiltersOnCancelFilter) {
              item.isCancelFilter = item.filterMultiple ? !val?.length : !val?.[0]
            }
            return { ...pre, [rowFieldLabel]: item.filterMultiple ? val : val?.[0] }
          })

          setPaginationParams(isShowPagination ? pagination : {})
        }

        // 将每个filter的搜索框在外面管理，这样点击重置时，可以将所有搜索框清空
        const setKeyWords = (val: string) => {
          setFilterKeyWords((pre => ({ ...pre, [rowFieldLabel]: val })))
        }
        return <TableFilter
          filterSearch={item.filterSearch || false}
          filterEnterSearch={item.filterEnterSearch || false}
          filterMultiple={item.filterMultiple ?? true}
          treeOptions={filterOptions || []}
          filterData={rowFieldValue}
          setFilter={setFilter}
          isCancelFilter={item.isCancelFilter}
          removeFiltersOnCancelFilter={item.removeFiltersOnCancelFilter}
          setKeyWords={setKeyWords}
          keyWords={filterKeyWords[rowFieldLabel]}

        ></TableFilter>
      }
      // antd4是以这个属性为准
      item.filteredValue = rowFieldValue ? [].concat(rowFieldValue) : [] // 受控的？
      item.filtered = lodash.isArray(rowFieldValue) ? !!rowFieldValue?.length : !!rowFieldValue
      item.filterIcon = (filter: boolean) => <img src={filter ? tableFilterActive : tableFilter} className="table-filter-icon"></img>
    }

    // 排序先不管
    if (item.sorter) {
      item.sortOrder = sortInfo[rowFieldLabel] as any
    }
    if (!item.render && emptyTdDefault) {
      return {
        ...item, render: (text: any) => {
          return (lodash.isString(text) ? text?.trim?.() : text) || emptyTdDefault
        }
      }
    }
    return item
  })


  // 重置表格
  const resetTable = (resetInfo: { filterInfo?: Record<string, React.Key[] | React.Key>, sortInfo?: Record<string, string>, pageInfo?: PaginationProps } = {}) => {
    const { filterInfo = {}, sortInfo = {}, pageInfo } = resetInfo

    setFilteredInfo(filterInfo)
    setSortInfo(sortInfo)
    setPaginationParams(isShowPagination ? (pageInfo ? pageInfo : pagination) : {})
    setFilterKeyWords({})
  }

  // 重置搜索表单
  const resetForm = () => {
    // 如果重置被自定义了，使用自定义函数
    const { customResetForm } = searchFormParams
    if (customResetForm && typeof customResetForm === 'function') {
      customResetForm(form, resetTable)
    } else {
      resetTable()
      form.resetFields()
    }
  }

  // 外面获取表格里面当前搜索参数
  const getTableParams = async () => {
    const formData = await form.validateFields()
    const page = {
      [paginationMap?.current || 'current']: paginationParams.current || 1,
      [paginationMap?.pageSize || 'pageSize']: paginationParams.pageSize || 10,
    }
    return {
      ...page,
      ...filteredInfo,
      ...sortInfo,
      ...formData
    }
  }

  // 将表格内部方法和参数暴漏出去
  // 1. getTableParams 获取表格组件当前接口调用的的参数，比如当前搜索的数据要导出
  // 2. 

  useImperativeHandle(ref, () => {
    const handleRefs = {
      setSortInfo,
      setPaginationParams,
      setFilteredInfo,
      getTableParams,
      form,
      resetForm
    }
    return handleRefs
  }, [filteredInfo, sortInfo, paginationParams])


  // if (isDependOnParent) {
  //   const parentHeight = scroll.y
  //   const autoHeight = parentRef.current?.offsetHeight || 360
  //   const formBox = parentRef.current?.querySelector('.table-header-box');
  //   const formBoxHeight = formBox?.offsetHeight ? formBox?.offsetHeight + 68 : 0
  // }

  // 传进来的jsx表单，使用toArray转化成数组，将最后一个取出来，放到查询按钮div里，以确保最后一个表单项始终和查询按钮在一行
  const newChildren = React.Children.toArray(formChildren?.props?.children)
  const lastFormItem = lodash.pullAt(newChildren, newChildren.length - 1);

  return (
    <div className={styles.baseTable} style={{ '--scroll-height': lodash.isNumber(scroll.y) ? scroll.y + 'px' : scroll.y }}>
      {(extra || formChildren) && (
        <div className="table-header-box">
          {
            formChildren && (
              <Form
                className="table-header-search"
                layout={'inline'}
                form={form}
                initialValues={{}}
                {...searchFormParams}
              >
                <Space size={[16, 16]} wrap>
                  {React.Children.map(newChildren, (item) => item)}
                  <div style={{ display: 'flex' }}>
                    {React.Children.map(lastFormItem, (item) => item)}
                    <div className="search-option" style={{ marginLeft: 16 }}>
                    <Button type="default" htmlType="submit" onClick={async () => {
                      if (onSearchBtnClick && lodash.isFunction(onSearchBtnClick)) {
                        onSearchBtnClick()
                      }

                      setPaginationParams(isShowPagination ? pagination : {})
                    }} className="search-btn">查询</Button>
                    <Button type="default" htmlType="button" onClick={resetForm} className="search-reset">重置</Button>
                  </div>
                  </div>
                </Space>
              </Form>
            )
          }
          {
            extra
          }
      </div>
      )}
      <Table<T>
        rowClassName="base-table-row"
        dataSource={dataSource}
        columns={fColumns}
        loading={loading}
        scroll={{
          ...scroll,
          scrollToFirstRowOnChange: true
        }}
        pagination={isShowPagination ? {
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total: number) => `共${total}条`,
          defaultCurrent: 1,
          total: total,
          pageSizeOptions: [10, 20, 30, 50, 100],
          size: "default",
          hideOnSinglePage: false,
          onChange: (current, pageSize) => {
            setPaginationParams({ current, pageSize })
          },
          ...pagination,
          current: paginationParams.current,
          pageSize: paginationParams.pageSize
        } : false}
        size="middle"
        onChange={handleTableChange}
        {...rest}
      />
      {/* <div className="footer-page" style={{ paddingTop: isShowPagination ? 40 : 0 }}> */}

      {/* {footSummary} */}
      {/* {
          isShowPagination && <Pagination
            showQuickJumper
            showSizeChanger
            showTotal={(total: number) => `共${total}条`}
            defaultCurrent={1}
            total={total}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            // size='small'
            onChange={(current, pageSize) => {
              setPaginationParams({ current, pageSize })
            }}
            {...pagination}
            current={paginationParams.current}
            pageSize={paginationParams.pageSize}
          />
        } */}
      {/* </div> */}
    </div>
  );
};

// export default forwardRef(BaseTable);
export default forwardRef(BaseTable) as <T>(
  props: Props<T> & { ref?: React.Ref<any> }
) => React.ReactElement;
