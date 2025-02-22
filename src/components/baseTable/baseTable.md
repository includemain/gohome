## 表格组件字段说明

#### 筛选

* 表格内使用filterDropdown对筛选框进行了自定义，可以自己再传filterDropdown覆盖筛选框

* 表格多选支持树形组件，没有children就不会显示成树

  ```js
      filters: [
        { text: 'Male9', value: 'male' },
        { text: 'Female30', value: 'female' },
        {
          text: 'Female2', value: 'female2',
           children: [
            { text: 'Female333', value: 'female333' },
            { text: 'Female444', value: 'female444' },
          ]
        },
      ],
  ```

* 可以使用columns中的filterSearch显示筛选搜索框，

  ```js
  filterSearch: boolean | ((val: string, options: TreeDataNode[]) => TreeDataNode[])
  ```

  为true时，默认本地搜索，为函数时，自定义搜索，其中option为当前筛选框中所有筛选项，返回自定义搜索后的筛选项，可以在里面远程获取数据，如

  ```js
  filterSearch: async (val, option) => {
        const res = await getList({current: 1, pageSize: 20, val: val})
        return res.data?.content?.map(e => ({text: e.email, value: e.email}))
      },
  ```

* customResetForm

  * 允许自定义重置事件，比如点击重置后指定某个formItem不刷新


* 外面控制表格的分页，筛选和排序,表格中使用了useImperativeHandle将里面函数暴漏出来，在外面调用这三个hook，可以引起表格刷新和调接口
  1. 表格内暴漏出三个hook  
      ```js
        const tableRef = useRef()
          <BaseTable
                ref={tableRef}
                style={{ height: 410 }}
                dataSource={data?.list || []}
                columns={fixedColumns}
          >
        // 目前只暴漏出这三个参数
        tableRef.current?.setFilteredInfo({xxx: 'xxx'})
        tableRef.current?.setSortInfo({xxx: 'xxx'})
        tableRef.current?.setPaginationParams({curent: 1, pageSize: 10})
      ```









