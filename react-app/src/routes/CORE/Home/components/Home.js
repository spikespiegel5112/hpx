import React from 'react';
import { Row , Col } from 'antd';
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';
import { getMoment, precisionFormat } from '../../../../core/util'
import { withRouter } from 'react-router'

import BaseMsg from './BaseMsg/BaseMsg';
import TodoList from './TodoList/TodoList';
import Notice from './Notice/Notice';
import MyProject from './MyProject/MyProject';

import './Home.css';

class Home extends React.Component{
  render(){
    return(
      <div className="eid-home">
      <Row gutter={16}>
        <Col span={10}>
          <BaseMsg />
        </Col>
          
        <Col span={7}>
          <TodoList/> 
        </Col>

        <Col span={7}>
          <Notice />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={18}>
          <MyProject
            fetchOMenu={this.props.fetchOMenu}
            fetchProject={ this.props.fetchProject }
            project={this.props.project}
          />
        </Col>
      </Row>
      </div>
    )
  }
}

export default withRouter(Home)
