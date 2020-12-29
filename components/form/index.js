import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Button, Form } from 'antd';
import fieldSource, { layout, isObject, isArray } from './fields';
import FormList from './form-list';
import './index.css';

let schema = [
  {
    type: 'checkbox',
    name: 'group',
    label: '测试内容',
    nested: 'array',
    fields: [
      {
        type: 'input',
        name: 'input',
      },
    ],
  },
  {
    name: 'input',
    nested: 'object',
    fields: [
      {
        name: 'group1',
        nested: 'object',
        fields: [
          {
            label: 'input',
            name: 'test2',
            type: 'input',
          },
        ],
      },
      {
        type: 'input',
        name: 'group2',
        label: '测试内容2',
        rules: [],
        props: {},
        fields: [{}],
      },
    ],
  },
];

const ScForm = props => {
  const [form] = Form.useForm();
  const getField = (type, props) => {
    return fieldSource(type, props);
  };
  /**
   * 解析schema
   */
  const parseSchema = (schema, parentName = '', node = []) => {
    let component = node;
    // let { schema = [] } = this.props;
    let isArr = Array.isArray(schema);
    if (!isArr) return false;
    schema.forEach(({ type, name, label, rules = [], props, fields, nested }) => {
      let aliasName = parentName ? `${parentName}.${name}` : name;
      if (fields && nested === 'object') {
        return parseSchema(fields, aliasName, component);
      }
      if (fields && nested === 'array') {
      }

      component.push(
        <Form.Item label={label} name={aliasName.split('.')} rules={rules}>
          {getField(type, props)}
        </Form.Item>
      );
    });
    return component;
  };

  const onFinish = data => {
    console.log(data);
    props.onSubmit && props.onSubmit(data);
  };

  const onFinishFailed = error => {
    props.onSubmit && props.onSubmit(data);
  };

  const onRest = () => {
    form.resetFields();
  };

  return (
    <Form
      {...layout}
      name='sc-form-render'
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      {parseSchema(schema)}
      {Array.isArray(schema) && schema.length !== 0 && (
        <Row className='sc-btn-group'>
          <Button type='primary' className='sc-btn-reset' onClick={onRest}>
            重置
          </Button>
          <Button type='primary' className='sc-btn-save' htmlType='submit'>
            提交
          </Button>
          <FormList />
        </Row>
      )}
    </Form>
  );
};

export default ScForm;
