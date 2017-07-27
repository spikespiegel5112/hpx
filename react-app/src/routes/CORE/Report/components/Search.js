import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import moment from 'moment'
import { getMoment } from '../../../../core/util'

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;

const dateFormat = 'YYYY/MM/DD';

class SearchForm extends React.Component {

  handleSearch = (e) => {
    e.preventDefault();
    const self = this;
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      
        values.creatTime = values.creatTime ? values.creatTime.format('YYYY/MM/DD') : '';
      
      self.props.search();
    });
  }

  handleReset = () => {
    this.props.clear();
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
          <FormItem {...formItemLayout} label={'名称'}>
            {getFieldDecorator('name')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'enterpriseName'}>
          <FormItem {...formItemLayout} label={'企业名称'}>
            {getFieldDecorator('enterpriseName')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'creatTime'}>
          <FormItem {...formItemLayout} label={'创建时间'}>
            {getFieldDecorator('creatTime')(
                <DatePicker />
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
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
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
      },{
        key: 'enterpriseName',
        value: {
          ...props.enterpriseName
        }
      },{
        key: 'creatTime',
        value: {
          ...props.creatTime,
          value: props.creatTime ? getMoment(props.creatTime.value, dateFormat) : null,
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);