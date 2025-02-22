import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  TreeSelect,
  Col,
  Row,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import './index.module.less'
// import SelectBox from "./SelectBox";
// import { files } from "../../util";
interface Iprops {
  formItemConfig?: any;
  name?: string | string[];
  label: string;
  value: any;
  width?: any;
  height?: any;
  maxWidth?: any;
  type:
    | "input"
    | "select"
    | "inputNumber"
    | "radio"
    | "textarea"
    | "checkBox"
    | "inputShow"
    | "none"
  | "checkRadio"
  | "checkBoxSingle"
  | "datePicker"
  | "textareaShow"
  | "treeSelect";
  children?: any;
}
const { useForm } = Form;

export function FormItems(props: Iprops) {
  const [form] = useForm();
  const { formItemConfig, name, label, type, children, width, maxWidth, height } = props;
  const [checkRadioVal, setcheckRadioVal] = useState([]);
  const renderComponents = (type: string) => {
    switch (type) {
      case "input":
        return <Input {...formItemConfig?.config} />;
      case "inputShow":
        return <Input style={formItemConfig?.config.style} className="onlyshow" disabled={true} />; //仅仅展示文案
      case "textareaShow":
        return <TextArea autoSize style={formItemConfig?.config.style} className="onlyshow" disabled={true} />; //仅仅展示文案
      case "textareaStrongShow":
        return <TextArea autoSize={{ maxRows: 2 }} style={formItemConfig?.config.style} className="onlyshow strong-show" disabled={true} />; //仅仅展示文案
      case "select":
        return <Select {...formItemConfig?.config} />;
      case "inputNumber":
        return <InputNumber controls={false} {...formItemConfig?.config} />;
      case "radio":
        return <Radio.Group {...formItemConfig?.config} />;
      case "textarea":
        return (
          <TextArea
            {...formItemConfig?.config}
            rows={
              formItemConfig?.config?.rows ? formItemConfig?.config?.rows : 1
            }
          />
        );
      case "checkBox":
        return <Checkbox.Group {...formItemConfig?.config} />;
      case "checkBoxSingle":
        return <Checkbox {...formItemConfig?.config}> {formItemConfig.innerchild}</Checkbox>;
      case "datePicker":
        return <DatePicker {...formItemConfig?.config} />;
      case "treeSelect":
        return <TreeSelect {...formItemConfig?.config} />;
      case "none":
        <></>;
      default:
        break;
    }
  };
  return (
    <div className="form-class-style checkbox-form-item" style={{ width: width || 'auto', maxWidth: maxWidth || 'auto', height: height }}>
      <Form.Item
        className="flex-formitem"
        {...formItemConfig}
        label={label}
        name={name}
        key={name}
      >
        {formItemConfig?.itemhide !== 'true' ? renderComponents(type) : <>{children}</>}
      </Form.Item>

      {formItemConfig?.itemhide !== 'true' ? <>{children}</> : <></>}
    </div>
  );
}

//  ConfigurableForm;
