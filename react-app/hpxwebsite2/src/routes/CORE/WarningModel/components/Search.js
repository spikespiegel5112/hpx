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
      
        values.timeRange = values.timeRange
          ? values.timeRange.length > 0
            ? [
              getMoment(moment(values.timeRange[0]), 'YYYY/MM/DD'),
              getMoment(moment(values.timeRange[1]), 'YYYY/MM/DD')
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
    const optionOne = this.props.industryList;
    const provinceOptions = optionOne.map(province => <Option key={province.id}>{province.industryName}</Option>);
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
        <Col span={8} key={'modelName'}>
          <FormItem {...formItemLayout} label={'模型名称：'}>
            {getFieldDecorator('modelName')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'timeRange'}>
          <FormItem {...formItemLayout} label={'日期范围：'}>
            {getFieldDecorator('timeRange')(
                <RangePicker
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'industryId'}>
            <FormItem {...formItemLayout} label={'行业：'}>
              {getFieldDecorator('industryId')(
                <Select>
                {provinceOptions}
                </Select>
              )}
            </FormItem>
          </Col>
      ,
        <Col span={8} key={'enabledState'}>
              <FormItem {...formItemLayout} label={'状态：'}>
                {getFieldDecorator('enabledState')(
                  <Select>
                    {[{"value":"0","name":"已启用"},{"value":"1","name":"已禁用"}].map(
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
        key: 'modelName',
        value: {
          ...props.modelName
        }
      },
      {
        key: 'timeRange',
        value:  {
          ...props.timeRange,
          value: props.timeRange && props.timeRange.value
          ? props.timeRange.value.length > 0
            ? [
              getMoment(props.timeRange.value[0], dateFormat),
              getMoment(props.timeRange.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      },
        {
        key: 'industryId',
        value: {
          ...props.industryId
        }
      },
        {
        key: 'enabledState',
        value: {
          ...props.enabledState
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);