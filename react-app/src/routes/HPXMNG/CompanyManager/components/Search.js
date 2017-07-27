import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import moment from 'moment'
import { getMoment } from '../../../../core/util'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class SearchForm extends React.Component {

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.search();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSearch}
      >
        <Row gutter={40}>
          {[
        <Col span={8} key={'name'}>
          <FormItem {...formItemLayout} label={'企业名称：'}>
            {getFieldDecorator('name')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'activated'}>
              <FormItem {...formItemLayout} label={'激活状态：'}>
                {getFieldDecorator('activated')(
                  <Select>
                    {[{"value":"T","name":"已注册"},{"value":"F","name":"未注册"}].map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                   )}
                  </Select>
                )}
              </FormItem>
            </Col>
      ]}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={this.props.loading}>
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);//调用父组件的更新方法
  },
  mapPropsToFields(props) {
    var arr = [{
        key: 'name',
        value: {
          ...props.name
        }
      },
        {
        key: 'activated',
        value: {
          ...props.activated
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);