import React from 'react'

import { Modal,Tabs,Icon,Tooltip} from 'antd'
import { withRouter } from 'react-router'
import './component.css'
import BaseInfo from './baseInfoTab/baseInfo'
import BankInfo from './bankAccountTab/bankAccount'
import UploadTable from './uploadFilesTab/uploadFiles'
import Identification from './identification/identification'
import AuthStep from './steps'
import { getReq } from '../../../../core/fetch'
const TabPane = Tabs.TabPane;

class ComInfo extends  React.Component{
    constructor(props){
        super(props);
        
        this.state = {

            authenticateStatus : null,

            steps : 0,

            tabs : 1,

            // 是否可编辑
            isAllEdite : false,
            
            
        }

        // API
        this.statusUrl = `/core/core/api/v1/enterprise/${this.props.eid}/authenticateProcess`;
    }
    
    authPrompt(){
        const tip = Modal.info({
            title:'提示',
            content:'请先完成企业认证!',
        });
        setTimeout(()=>tip.destroy(),5000)
    }

    fetchStatus = () => {
        (
            async () => {
                try{
                    const resp = await getReq(this.statusUrl);
                    const res = await resp.json();
                    console.log(res)
                    const { authenticateStatus } = res;
                    this.setState({
                        authenticateStatus,
                    })
                    if(authenticateStatus !== 'T'){
                        this.setState({
                            isAllEdite : true,
                        })
                    }else if (authenticateStatus == 'T'){
                        this.setState({
                            isAllEdite : false,
                        })
                    };
                    this.showStatus(authenticateStatus);
                }catch(e){
                    
                }
            }
        )()
    }

    componentDidMount(){
        this.fetchStatus();
        if(this.props.auditState !== 'T'){
             this.authPrompt()
        };      
    }

    showStatus = (status) => {
        switch (status) {
            case 'F' :
                this.setState({
                    steps : 1,
                    tabs : 2,
                })
            break;
            case 'B' :
                this.setState({
                    steps : 2,
                    tabs : 2,
                })               
            break;
            case 'T' :
                this.setState({
                    steps : 1,
                    tabs : 4,
                })
            break;
            default :
                this.setState({
                    steps : 0,
                    tabs : 1,
                })
        }
    }

    next = () => {
        let { tabs } = this.state;
        tabs++;
        this.setState({
            tabs,
        })
    }

    tabsChange = (index) => {
        this.setState({
            tabs : parseInt(index.slice(-1)),
        })
    }

    render(){
        const { comInfo,fetchComInfo,updateComInfo,eid} = this.props;
        const { authenticateStatus , isAllEdite , steps , tabs } = this.state;
        return <div>
                    <div className='up-section'>
                        <div style={{width:'70%',margin:'0 auto'}}> 
                            <AuthStep />
                        </div>
                    </div>

                    <div className='content-section acc-eid-content'>
                        <Tabs 
                            type="card" 
                            activeKey={'acc-status::'+ tabs}
                            tabBarExtraContent={ tabs > 3 ? null : <Tooltip title='确定信息已完善'> <a href='javascript:void(0)' onClick={this.next}>下一步</a></Tooltip>}
                            onChange={this.tabsChange}
                        >
                            <TabPane tab={<span><Icon type='info-circle-o' />基本信息</span>} key="acc-status::1">
                                <BaseInfo   
                                    comInfo={comInfo}
                                    fetchComInfo={fetchComInfo}
                                    updateComInfo={updateComInfo}
                                    isAllEdite={isAllEdite}
                                />
                            </TabPane>
                            <TabPane tab={<span><Icon type='bank' />银行账户</span>} key="acc-status::2">
                                <BankInfo
                                    eid={eid}
                                    isAllEdite={isAllEdite}
                                />
                            </TabPane>
                            <TabPane tab={<span><Icon type='file' />文档上传</span>}  key="acc-status::3">
                                <UploadTable
                                    eid={eid}
                                    isAllEdite={isAllEdite}
                                />
                            </TabPane>
                            <TabPane tab={<span><Icon type='check' />企业认证</span>} disabled={tabs !== 4}  key="acc-status::4">
                                <Identification 
                                    eid={eid}
                                    isAllEdite={isAllEdite}
                                />
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
    }

}

export default withRouter(ComInfo)