import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./index.less";
import { Pagination } from "antd";
const nodataImg = require("@/assets/nodata.png");
const loadingImg = require("@/assets/loading.png");

interface Iprops {
  tableColumn: any[];
  tableData: any[];
  pagination?: boolean;
}
//定义的路由函数直接挂载到主页面上去
const TelMsg = function (props: Iprops) {
  const [form] = useForm();

  const { tableColumn, tableData, pagination } = props;
  const [rowData, setRowData] = useState(tableData);
  const [colDefs, setColDefs] = useState(tableColumn);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      filter: true,
      menuTabs: ["filterMenuTab"],
    };
  }, []);
  useEffect(() => {

    const column = tableColumn.map((item) => {
      // table的排序问题重置
      if (item.sortable) {
      } else {
        item.sortable = false;
      }
      // table的筛选功能重置
      // item.filter = "";
      return item;
    });

    setColDefs([...column]);
  }, [tableColumn]);
  // const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 100];
  const MyOverlay = {
    template: `
       <div class="ag-overlay-loading-center" style="background-color: lightcoral;">
           <i class="far fa-frown"> {{params.noRowsMessageFunc()}}</i>
       </div>
   `,
  };

  const gridOptions: any = {
    noRowsOverlayComponent: MyOverlay,
    noRowsOverlayComponentParams: {
      noRowsMessageFunc: () => "Sorry - no rows! at: " + new Date(),
    },
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz amanyagent_table" // applying the grid theme
      style={{ height: 500 }} // the grid will fill the size of the parent container
    >
      <AgGridReact
        // sideBar={"filters"}
        pagination={pagination}
        // paginationAutoPageSize={true}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        rowData={rowData || []}
        columnDefs={colDefs}
        rowHeight={52}
        defaultColDef={defaultColDef}
        // defaultColDef={{ lockPosition: true, filter: true }}
        overlayNoRowsTemplate={`<div class="ag-overlay-no-rows">
            <img src=${nodataImg} />
            <p>暂无数据</p>
        </div>`}
        overlayLoadingTemplate={`<div class="ag-overlay-loading">
            <div><img src=${loadingImg} /></div>
            <p>加载中……</p>
        </div>`}
      />
      {/* {pagination && (
        <div className="amanyagent_table-pagination">
          <Pagination
            total={85}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 页`}
          />
        </div>
      )} */}
    </div>
  );
};
export default TelMsg;
