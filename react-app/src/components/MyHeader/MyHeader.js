import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Menu, Dropdown, Button, Layout, Icon } from 'antd'

import s from './MyHeader.css'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

export const MyHeader = (props) => {
  
  const { login } = props;
  const menuStyle = {
    lineHeight: '58px', float: 'right' ,zIndex:1000,
  }
  let right = null;
  if(login.isLogin){
    if(login.userInfo.auditState === 'F'){
      right = (<Menu mode="horizontal"
                    style={menuStyle}>
                    <Menu.Item key="setting:1"><Link to='/hpx2/core/security-setting'>个人信息</Link></Menu.Item>
                    <Menu.Item>{login.userInfo ? <a><Icon type='user'/>{login.userInfo.name}</a>: '我的'}</Menu.Item>
                    <Menu.Item key="setting:2"> <a onClick={props.logOut}>登出</a></Menu.Item>
              </Menu>)
    }else{
    right = (<Menu mode="horizontal"
                    style={menuStyle}>
              <Menu.Item key='1'>
                <Link to='/hpx2/core/home'>
                  <Icon type='home'/>控制台
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:1"><Link to='/hpx2/core/security-setting'>个人信息</Link></Menu.Item>
              <Menu.Item key='setting:2'>{login.userInfo ? <a><Icon type='user'/>{login.userInfo.name}</a>: '我的'}</Menu.Item>
              <Menu.Item key="setting:3"><a onClick={props.logOut}><Icon type='logout' />登出</a></Menu.Item>
            </Menu>)
    }
  }else{
    right = (<Menu mode="horizontal"
                    style={menuStyle}>
              <Menu.Item key='1'>
                <Link to='/login'>
                   <Icon type='login' />登陆
                </Link>
              </Menu.Item>
              <Menu.Item key='2'>
                <Link to='/login'>
                   <Icon type='login' />官网
                </Link>
              </Menu.Item>
            </Menu>)
  }
  return  <Header id="topBar">
            <div className="logo" title="运营管理监控平台" />
            {right}
          </Header>
}

export default MyHeader
