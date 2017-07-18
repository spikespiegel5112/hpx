import React from 'react'
import { Card ,Icon } from 'antd';
import {  Link, withRouter, browserHistory } from 'react-router'
import CardTitle from '../../../../../components/CardTitle'
import './SideMenu.css'

class Moreside extends React.Component{
    render(){
        return (
            <div>
                <Link to='/hpx2/core/project'>更多项目</Link>
            </div>
        )
    }
}

class SideMenu extends React.Component{
  constructor(){
    super();
    this.state={
    }
  }
  
  render(){
    return(
      <div className="sideMenu">
        用户管理
      </div>
    )
  }
}

export default SideMenu
