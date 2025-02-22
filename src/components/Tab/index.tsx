import React from "react";
import "./index.less";
//各自的tab样式写在组件里，相似度较高可以通过class控制
interface Iprops {
  type?: "vertical" | "horizontal";
  onClick: (i: string) => void;
  tabList: Array<any>;
  className?: string;
  children?: any;
  current: string;
  defaultCur?: string;
}
const Tabs: React.FC = (props: Iprops) => {
  //ts-ignore
  const { tabList, onClick, type, className, current, children, defaultCur } =
    props;
  function border(index: string) {
    //    else if (index === current - 1) {
    //   return "normal borderBtmRight ";
    // } else if (index === current + 1) {
    //   return "normal borderTopRight";
    // }
    if (index === current || 0) {
      return "normal active";
    } else {
      return "normal";
    }
  }
  const btnClick = (val) => {
    if (val === current && defaultCur) {
      onClick && onClick(defaultCur || "");
    } else {
      onClick && onClick(val);
    }
  };
  return (
    <div
      className={
        (type === "vertical" ? "vertical" : "horizontal ") + (className || "")
      }
    >
      <div className={"tabs"}>
        {tabList &&
          tabList.map((item: any, index: number) => {
            return (
              <div
                className={
                  current === item.tabCode
                    ? "tabsPack tabsPackAct"
                    : "tabsPack "
                }
                key={index}
              >
                <div
                  className={border(item.tabCode)}
                  onClick={() => btnClick(item.tabCode)}
                >
                  {item.icon && (
                    <>{current === item.tabCode ? item.lightIcon : item.icon}</>
                  )}
                  <p>{item.tabName}</p>
                  <div
                    className={
                      item.tabCode === current || 0
                        ? "tabsLine tabsLineActive"
                        : "tabsLine"
                    }
                  ></div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="tabMes">{children}</div>
    </div>
  );
};

export default Tabs;
