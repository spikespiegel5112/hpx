import React from 'react'
import { Card , Icon } from 'antd';
import { Link, withRouter, browserHistory } from 'react-router'
import CardTitle from '../../../../../components/CardTitle'

class TitleTodo extends React.Component{
  render(){
    return (
      <div>
          <CardTitle title={this.props.title} />
          <span style={{marginLeft:10,color:'#169bd5'}}>({this.props.todoNum})</span>
      </div>     
    )
  }
}

class TodoList extends React.Component{
  constructor(){
    super();
    this.state={
        todoNum: '10'
    }
  }
  
  render(){
    return(
      <Card 
        title={<TitleTodo title='代办事宜' todoNum={this.state.todoNum} />}  
        extra={<Link to="">查看更多</Link>}
        loading={false}>
          <ul className='eid-home-container'>
              <li>1.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
              <li>2.云联项目,企业A,保理,100万 &nbsp; <Link>查看</Link></li>
              <li>3.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
              <li>4.云联项目,企业A,保理,100万 &nbsp; <Link>查看</Link></li>
              <li>5.企业A,保理,入池申请,100万 &nbsp; <Link>查看</Link></li>
          </ul>
      </Card>
    )
  }
}

export default TodoList
