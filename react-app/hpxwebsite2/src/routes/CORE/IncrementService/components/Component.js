import React from 'react'
import fetch from '../../../../core/fetch'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { Button, Icon, message, Card , Modal} from 'antd'
import { putReq , formPostReq} from '../../../../core/fetch'
import './Component.css';
import PostModal from './PostModal'
class Compo extends React.Component {
  constructor(props) {
    super(props);

    this.serviceOpenUrl = '/core' + `/core/api/v1/enterprise/${this.props.eid}/serviceApplication`

    this.state = {
      serviceData: {},
      postModalVisible : false,
      serviceId : null,
    }
  }

  getfilesUrl = (fileType)=>'/core'+`/core/api/v1/download/attachfiles/${fileType}` ;

  componentDidMount() {
    const that = this;
    fetch('/data/incrementService.json')
      .then(resp => resp.json())
      .then((json) => {
        that.setState({
          serviceData:json
        })
      }).catch((ex) => {
        console.log("failed", ex)
      })
  }

  modalShow (data){
    console.log(data)
    this.setState({
      postModalVisible : true,
      serviceId : data
    })
  }

  test = (data , id)=>{
    (
      async ()=>{
        try{
          const resp = await putReq(
            this.serviceOpenUrl,
            {
              code : this.state.serviceId,
              fileId :  id
            }
          )
          console.log('shengqing',resp)
          const msg = decodeURI(resp.headers.get('x-hpx-alert'));
          message.success(msg)
          this.setState({
            postModalVisible:false
          })
        }catch(e){
          message.error(e)
        }
        
      }
    )()
  }

  onCancel = ()=>{
    this.setState({
      postModalVisible :false
    })
  }
  
  getFiles = (code)=>{
    const url = this.getfilesUrl(code);
    (
      async ()=>{
        try{
        //  const resp = await formPostReq(url,{}); 
        window.location.href = url
        //  console.log(resp);
        }catch(e){

        }
      }
    )()
    
  }

  render() {
    const serviceData = this.state.serviceData.data;
    let service = serviceData ? serviceData.map((v,i) => {
      return <div key={'service::' + i} className="service" >
        <img src={v.pic} className="img"/>
        <div className="remark">
          <span className="name">{ v.name }</span>
          <p>{ v.remark }</p>
        </div>
        <a onClick={() => this.modalShow(v.code)}>
          <Icon type="right" className="icon"/>
        </a>
        <Button onClick={()=>this.getFiles(v.code)}>下载授权书</Button>
      </div>
    }) : null
    let view = <div>
      <Card title="添加服务" style={{ width: '80%', margin: '0 auto'}}>
        {service}
        <PostModal 
          visible={ this.state.postModalVisible }
          onOk={this.test}
          onCancel={this.onCancel}
        />
      </Card>
    </div>;
    if (this.props.children) {
      view = this.props.children
    }
    return view;
  }
}

Compo.propTypes = {

}

export default withRouter(Compo)
