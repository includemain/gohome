import React, { Children } from "react";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  Button,
} from "antd";
import "./index.less";
interface Iprops {
  formData: any;
}
const { useForm } = Form;
const { RangePicker } = DatePicker;
// 弃用
export function ConfigurableForm(props: Iprops) {
  const [form] = useForm();
  const { formData } = props;
  const renderComponents = (type) => {
    switch (type) {
      case "input":
        return <Input />;
      case "inputShow":
        return <Input />; //仅仅展示文案
      case "select":
        return <Select />;
      case "inputNumber":
        return <InputNumber />;
      case "radio":
        return <Radio />;
      case "checkBox":
        return <Checkbox />;
      case "rangePicker":
        return <RangePicker />;
      default:
        break;
    }
  };
  return (
    <div className="form-search-style">
      <Form form={form}>
        {formData?.map((item) => (
          <Form.Item
            {...item.formItemConfig}
            label={item.label}
            name={item.name}
            key={item.name}
          >
            {renderComponents(item.type)}
          </Form.Item>
        ))}
        <Button type="primary" ghost>
          查询
        </Button>
        <Button>重置</Button>
        {/* {ChildrenItem} */}
      </Form>
    </div>
  );
}

//  ConfigurableForm;
