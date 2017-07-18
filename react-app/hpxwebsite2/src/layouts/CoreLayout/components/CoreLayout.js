import React from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router'
import { Layout, Menu, Breadcrumb, Icon, Dropdown, Button ,Spin} from 'antd';
import QueueAnim from 'rc-queue-anim';

import MySider from '../../../components/MySider'

import './CoreLayout.css'
import '../../../styles/core.less'

const { SubMenu } = Menu;
const { Header, Content,Sider} = Layout;

class CoreLayout extends React.Component {

  componentWillMount( ){
  }

  itemRender= (route, params, routes)=>{
    console.log(route, params, routes);
    return <span>{route.breadcrumbName}</span>;
  }

  render() {
    const { auditState, menu, children, clearSignInErr, signIn, logOut ,loading , routes , params ,route , paths} = this.props;
    console.log(auditState,typeof(auditState));
    let siderView = <MySider menu={menu} fetchMenu={this.props.fetchMenu} />
    let view= <Layout style={{ flexDirection: 'row'}}>
                  { siderView }
                  {/*<MySider menu={menu} fetchMenu={this.props.fetchMenu} isS={5}  />*/}
                  <Layout> 
                    <section className='breadcrumb-setion'>
                        <span style={{float:'left',fontSize:12,marginRight:10}}>当前位置:</span>
                        <Breadcrumb style={{float:'left'}} itemRender={this.itemRender} routes={[routes[2],routes[3]]} params={params} separator='>' />
                    </section>                   
                    <Content style={{padding: '0 30px'}}>
                      <QueueAnim
                      type={['right', 'left']}
                        >
                        <div key={children.props.location.pathname}>
                            {children}
                        </div>
                      </QueueAnim>
                    </Content>
                  </Layout>       
              </Layout>
    return auditState ? view : null;
  }
}

CoreLayout.propTypes = {
  children          : PropTypes.element.isRequired,
  menu              : PropTypes.object.isRequired,
  logOut            : PropTypes.func.isRequired,
  signIn            : PropTypes.func.isRequired,
  clearSignInErr    : PropTypes.func.isRequired,
}

export default withRouter(CoreLayout)
