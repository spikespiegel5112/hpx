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
        values.addTime = values.addTime
          ? values.addTime.length > 0
            ? [
              getMoment(values.addTime[0], 'YYYY/MM/DD'),
              getMoment(values.addTime[1], 'YYYY/MM/DD')
            ].filter((v) => !!v)
            : ''
          : '';
      
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
        <Col span={7} key={'name'}>
          <FormItem {...formItemLayout} label={'标签名'}>
            {getFieldDecorator('name')(
              <Input style={{width:"70%"}} placeholder="请输入标签名称" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={9} key={'addTime'}>
          <FormItem {...formItemLayout} label={'时间范围'}>
            {getFieldDecorator('addTime')(
                <RangePicker style={{width:"70%"}} placeholder=""
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'labelState'}>
          <FormItem {...formItemLayout} label={'启用状态'}>
            {getFieldDecorator('labelState')(
              <Select style={{width:"70%"}}>
                {[{"value":"1","name":"已启用"},{"value":"0","name":"已禁用"}].map(
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
        key: 'addTime',
        value:  {
          ...props.addTime,
          value: props.addTime && props.addTime.value
          ? props.addTime.value.length > 0
            ? [
              getMoment(props.addTime.value[0], dateFormat),
              getMoment(props.addTime.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      },{
        key: 'labelState',
        value: {
          ...props.labelState
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);
