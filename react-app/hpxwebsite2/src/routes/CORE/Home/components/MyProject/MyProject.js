import React from 'react'
import {Link,withRouter} from 'react-router'
// import GetProject from './GetProject'
import { Button , Card } from 'antd'
import CardTitle from '../../../../../components/CardTitle'
import './MyProject.css'


class MoreProject extends React.Component{
    render(){
        return (
            <div>
                <Link to='/hpx2/core/project'>更多项目</Link>
            </div>
        )
    }
}

class MyProject extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            project : []
        }
    }

    render(){
        let view = null;
        if(!this.props.project.data.length && this.props.project.status === 'SUCCESS'){
           view = (<li>
                还没有项目,快去添加
                <Button type='primary'>新增项目</Button>
            </li>)
        }else{
        view = this.props.project.data.map((v,i)=>{
                            const productCode = v.productCode.toLowerCase();
                            // 路径要把默认页面的整个路由写全
                            return (
                                <li key={v.projectId}>
                                    <Link to={{pathname:'/hpx2/huaqian/demanderPro',query:{projectId:v.projectId}}}>{v.projectName}</Link>
                                </li>
                            )
                        })
        }
        return (
           <Card 
            className='types-project' 
            title={<CardTitle title='我的项目' />}
            extra={<MoreProject />}
            loading={false}>
                <ul>
                    {
                       view 
                    }
                </ul>
           </Card> 
        )
    }
    componentWillMount(){
        this.props.fetchProject()
    }
    componentDidMount(){

    }
}

export default MyProject  
