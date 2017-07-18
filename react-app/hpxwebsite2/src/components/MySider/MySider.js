import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Menu, Dropdown, Button, Layout, Icon ,Modal} from 'antd'
import s from './MySider.css'
const { Header, Sider } = Layout;
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

class MySider extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openKey:[],
      selectedKey:'',
      collapsed : false,
      mode : 'inline',
    };
    this.isS = this.props.isS
    this.path = location.pathname;
  }

  linkTo(item,key,keyPath){
    //更新侧边栏选中项
    // this.props.updateSelectedKey(item.key);
    //切换路由
    console.log(key,keyPath,900000)
    let link = item.item.props.link
    this.props.router.push(link);
  } 
  
  onCollapse = (collapse,type)=>{
   console.log(collapse,type);
   this.setState({
     collapsed:collapse,
     mode : collapse ? 'vertical' : 'inline'
    })
  }

  componentDidMount(){
    let path = location.pathname;
    let diffPath = path.split('/');
    if(!diffPath[2] || diffPath.length < 3)return;
    switch(diffPath[2]){
      case 'huaqian' :
      this.props.fetchMenu(2);
      break;
      default :
      this.props.fetchMenu()
    }
    
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }

  render() {
    //最多支持三层目录
    const { menu } = this.props;
    const { selectedKey , openKey } = this.state;
    const listView = menu.data.map(
      ( v, i ) => {
        if( v.vRolePermissionCustom && v.vRolePermissionCustom.length ){
          return <SubMenu key={v.permissionsId} title={<span><Icon type={v.menuIcon} /><span className='nav-text'>{v.name}</span></span>}>
                    {
                      v.vRolePermissionCustom.map(
                        ( sub, i) => {
                          if( sub.vRolePermissionCustom && sub.vRolePermissionCustom.length ){
                            return <MenuItemGroup key={sub.name} title={sub.name}>
                                    {
                                      sub.vRolePermissionCustom.map(
                                        ( subSub, i) => {
                                          if(subSub.link == selectedKey){
                                              this.state.openKey[0]=v.permissionsId;
                                          }
                                          return (
                                            <Menu.Item key={subSub.link + i} link={sub.link}>{subSub.name}</Menu.Item>
                                          )
                                        }
                                      )
                                    }
                                  </MenuItemGroup>
                          }else{                          
                            return <Menu.Item key={sub.link + i} link={sub.link}>{sub.name}</Menu.Item>;
                          }
                          
                        }
                      )
                    }
                  </SubMenu>
          }else if(v.link){
            return  <Menu.Item key={v.link + i} link={v.link}>{v.name}</Menu.Item>
          }
        });
      return (<Sider
                trigger={<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />}
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
                width={200}
              >
                  <Menu
                    mode={this.state.mode}
                    theme='dark'
                    defaultSelectedKeys={[selectedKey]}
                    defaultOpenKeys={this.state.openKey}
                    onClick={this.linkTo.bind(this)}
                  >
                    {listView}
                  </Menu>

              </Sider>)
  }
}

export default withRouter(MySider)
