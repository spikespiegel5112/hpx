import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Table, Form, Input, Icon, Select, Popconfirm, message, Tooltip, Row, Col, Card } from 'antd'
import { getMoment, precisionFormat } from '../../../../../core/util'
import './Detail.css';

import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const Option = Select.Option;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
        key: 'oneLevel',
        title: '评分类别',
        dataIndex: 'oneLevel',
      },{
        key: 'twoLevel',
        title: '评分项',
        dataIndex: 'twoLevel',
      },{
        key: 'threeLevel',
        title: '评分标准',
        dataIndex: 'threeLevel',
      },{
        key: 'score',
        title: '分值',
        dataIndex: 'score',
      },{
        key: 'targetGradeWeight',
        title: '评分权重(%)',
        dataIndex: 'targetGradeWeight',
      },{
        key: 'targetPricingWeight',
        title: '定价权重(%)',
        dataIndex: 'targetPricingWeight',
      },{
        key: 'targetFloatParameter',
        title: '浮动',
        dataIndex: 'targetFloatParameter',
      }];
  }

  componentWillMount() {
    const id = this.props.params.id
    this.props.fetchDetail(id);
  }
  
  componentWillReceiveProps(nextProps) {
    const { deleteStatus, listStatus, fetchList, list, err } = nextProps;
    if (
      this.props.listStatus.type != listStatus.type
      && listStatus.type.match('SUCCESS')
      && list.rows.length == 0 && list.queryParams.pagination.total > 0
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (
      this.props.deleteStatus.type != deleteStatus.type
      && deleteStatus.type.match('SUCCESS')
    ) {//删除成功重新拉取列表数据
      fetchList();
    }
    if (err) {//拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }

  getUrlQueryParams(v) {
    try{
      v = v || JSON.parse(this.props.params.queryParams || '{}');
    }catch(e){
      console.log(e)
    }
    return '/hpx2/label-info/' + encodeURI(JSON.stringify(v || {}));
  }

  render() {
    const { inputs, list, detailList, fetchList, listStatus, updateInputs } = this.props;

    let view = <div>
      <Button 
            type="primary"
            onClick={()=>{window.history.back()}}
            className='back'
            style={{ marginRight:'16px', float:'right'}}
          >
            返回
      </Button>
      <div className='scoreCardName'>
        <span>{detailList.scoreCardName}</span>
      </div>
      <Table
        rowKey="detail"
        columns={this.columns}
        dataSource={detailList.modelTargetInfos}
        bordered={true}
        pagination={false}
        style={{marginBottom: '20px'}}
        loading={listStatus.loading}
      />
    </div>;
    //默认child全部替换父路由视图，也可以只替换部分视图，即嵌套，或者弹出子路由对应的视图
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

export default withRouter(Detail)
