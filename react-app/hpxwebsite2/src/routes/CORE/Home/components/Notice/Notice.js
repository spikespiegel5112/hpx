import React from 'react'
import { Icon , Card} from 'antd';
import { Link, withRouter, browserHistory } from 'react-router'
import CardTitle from '../../../../../components/CardTitle'

class MoreNotice extends React.Component{
    render(){
        return (
            <div>
                <Link to='/hpx2/core/project'>更多</Link>
            </div>
        )
    }
}
class Notice extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  
  render(){
    return(
      <Card title={<CardTitle title='公告' />} extra={<MoreNotice />} loading={false}>
        <ul className='eid-home-container'>
            <li>1.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
            <li>2.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
            <li>3.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
            <li>4.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
            <li>5.海平线正式迁入海航云服务 &nbsp; <Link>查看</Link></li>
        </ul>
      </Card>
    )
  }
}

export default Notice
