import { Input, Checkbox, Radio, Select } from 'antd';
export default (type, props) => {
  if (type === 'input') {
    return <Input {...props} />;
  }

  if (type === 'checkbox') {
    return <Checkbox {...props} />;
  }

  if (type === 'select') {
    return <Select {...props} />;
  }

  if (type === 'radiogroup') {
    return <Radio.Group {...props} />;
  }
};

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const isObject = field => {
  return field && Object.prototype.toString.call(field) === '[object Object]';
};

export const isArray = field => {
  return field && Object.prototype.toString.call(field) === '[object Array]';
};
