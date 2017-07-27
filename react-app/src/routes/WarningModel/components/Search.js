import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Form, Row, Col, Input, Button, Icon, Select, DatePicker } from 'antd';
import moment from 'moment'
import { getMoment } from '../../../core/util'

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
      
        values.field2 = values.field2 ? values.field2.format('YYYY/MM/DD') : '';
      
        values.field3 = values.field3
          ? values.field3.length > 0
            ? [
              getMoment(values.field3[0], 'YYYY/MM/DD'),
              getMoment(values.field3[1], 'YYYY/MM/DD')
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
    console.log(2,this.props.industrylist)
    const optionOne = this.props.industrylist.rows;
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
        <Col span={8} key={'field1'}>
          <FormItem {...formItemLayout} label={'模型名称：'}>
            {getFieldDecorator('field1')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'field2'}>
          <FormItem {...formItemLayout} label={'日期范围：'}>
            {getFieldDecorator('field2')(
                <RangePicker
                  format={dateFormat}
                />
            )}
          </FormItem>
        </Col>
      ,
         <Col span={8} key={'field3'}>
          <FormItem {...formItemLayout} label={'创建人：'}>
            {getFieldDecorator('field3')(
              <Input placeholder="" />
            )}
          </FormItem>
        </Col>
      ,
        <Col span={8} key={'field4'}>
            <FormItem {...formItemLayout} label={'行业：'}>
              {getFieldDecorator('field4')(
                <Select>
                  {/*{[{"value":"0","name":"行业1"},{"value":"1","name":"行业2"}].map(
                  (v) => <Option key={v.value} value={v.value}>{v.name}</Option>
                )}*/}

                {provinceOptions}
                </Select>
              )}
            </FormItem>
          </Col>
      ,
        <Col span={8} key={'field5'}>
              <FormItem {...formItemLayout} label={'状态：'}>
                {getFieldDecorator('field5')(
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
        key: 'field1',
        value: {
          ...props.field1
        }
      },
      {
        key: 'field2',
        value:  {
          ...props.field3,
          value: props.field3 && props.field3.value
          ? props.field3.value.length > 0
            ? [
              getMoment(props.field3.value[0], dateFormat),
              getMoment(props.field3.value[1], dateFormat)
            ].filter((v) => !!v)
            : null
          : null,
        }
      },
      {
        key: 'field3',
        value: {
          ...props.field3
        }
      },
        {
        key: 'field4',
        value: {
          ...props.field4
        }
      },
        {
        key: 'field5',
        value: {
          ...props.field5
        }
      }];
    var obj = {};
    arr.forEach(
      (v)=> obj[v.key] = v.value
    )
    return obj;
  },
})(SearchForm);