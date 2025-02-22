import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";
interface Iprops {
  config: any;
  children?: any;
}
//定义的路由函数直接挂载到主页面上去
const MyModal = (props: Iprops) => {
  const { config, children } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleOk = () => {
    const { onOK } = config;
    onOK?.();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    const { onClose } = config;
    onClose?.();
    // modal.destroyAll();
    setIsModalOpen(false);
  };
  const getModal = () => {
    return (
      <Modal
        // title="Basic Modal"
        {...config}
        // width={900}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    );
  };
  return <>{getModal()}</>;
};
export default MyModal;
