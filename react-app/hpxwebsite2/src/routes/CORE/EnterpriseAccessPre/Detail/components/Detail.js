import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import moment from 'moment'
import { postReq } from '../../../../../core/fetch'
import './Detail.css'
import { Select,Button, message,Card,Icon,Spin,InputNumber,notification } from 'antd';
import { precisionValidator } from '../../../../../core/antdFormUtil.js'

const Option = Select.Option;
let targetInfosInfo = [];
let targetIndex = 0;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      industryData: '请选择',
      modelData: '请选择',
      badRate:'',
      toPage:'',
      loading:false,
      cardCss:'cardShow',
      done:0,
      pid:0,
      cid:0
    };
  }

  componentWillMount() {

    var pid =this.props.location.query.pid;
    var cid =this.props.params.id;
    this.setState({
        pid:pid,
        cid:cid
    });

    this.props.fetchIndustryList();
    if(this.state.modelData == '请选择'){
      //清空
      this.clearSmInfo();
      this.clearModelInfo();
    }
  }

  clearSmInfo = ()=>{
    this.setState({
        cardCss:'cardHide'
    });

    //清空
    this.props.scoringmodel.gradeCardName='';
    this.props.scoringmodel.gradeCardDescribe='';
    let labelInfos = this.props.scoringmodel.labelInfos;
    labelInfos.splice(0,labelInfos.length);
    this.props.clearSmInfo(this.props.scoringmodel);
    //清空已选下拉选择
    targetInfosInfo.splice(0,targetInfosInfo.length);
    targetIndex = 0;
  }

  clearModelInfo = ()=>{
    let modelData = this.props.modelList.data;
    modelData.splice(0,modelData.length);
    this.props.clearModelInfo(this.props.modelList.data);
   }

  handleOptionChange = (value) => {
    //清空
    this.clearSmInfo();

    this.setState({
      modelData: '请选择'
    });
    if(''+ value != '请选择'){
        this.props.fetchModelList(value);
    }
  }

  onSecondOptinChange = (value) => {
    this.setState({
      modelData: value,
    });
    
    //清空
    this.clearSmInfo();
  }

  onOptionSubmit = () => {
    let modelValue = this.state.modelData;
    if(''+ modelValue == '请选择'){
      message.error('请选择模型！');
    }else{
      this.props.fetchScoringmodel(modelValue);
      this.setState({
        cardCss:'cardShow'
      });
    }
  }

  onThreeLevelChange = (value) => {
    let tL = value.split('@')
    targetInfosInfo.map(tmp => tmp.cardId == tL[0] && tmp.index == tL[1] ? tmp.value = tL[2]: tmp.value );
    targetInfosInfo.map(tmp => tmp.cardId == tL[0] && tmp.index == tL[1] ? tmp.done = true : tmp.done );
     this.setState({
        done:this.state.done++
    });

  }

  onInputChange = (value) =>{
     this.setState({
      badRate: value,
    });
  }

  onReportSubmit = () =>{
    let labels = [];
    let targetInfo = [];
    let reportInfo = {
      badRate:0,
      labels:[],
      mid:'',
      pid:''
    } ;

    let modelValue = this.state.modelData;

    if(''+ modelValue == '请选择'){
      message.error('请选择模型！');
      return;
    }

    if(this.state.badRate == ''){
      message.error('请填写预期不良率！');
      return;
    }

    for(let i = 0; i < targetInfosInfo.length; i ++){
      if(targetInfosInfo[i].value == ''){
       message.warning('标题【'+targetInfosInfo[i].tag +"】未选择 ");
       // this.openNotificationWithIcon('warning','打分项选择','您有标题为['+targetInfosInfo[i].tag +']未选择');
        return;
      }else{
        //已有的不加入
        if(labels.indexOf(targetInfosInfo[i].cardId) == -1){
            labels.push(targetInfosInfo[i].cardId);
        }
      }
    }
    labels = Array.from(labels);
    for(let n = 0;n< labels.length; n++){
       let tags = [];
       for(let i = 0; i < targetInfosInfo.length; i ++){
          if(labels[n] == targetInfosInfo[i].cardId){
              tags.push({'subItem':targetInfosInfo[i].value});
          }
        }
        targetInfo.push({'labelId':labels[n],'subitems':tags});
    }

    reportInfo.badRate =  this.state.badRate;
    reportInfo.labels = targetInfo;
    reportInfo.mid = modelValue;
    reportInfo.pid = this.state.pid;
    this.props.saveReport(reportInfo);

    let timer =setInterval(() => {
       
      if(!this.props.smSaveStatus.loading){
        let flag = this.props.smSaveStatus.type;
        if(flag.match('SUCCESS')){
          //成功后处理
          console.log('smSaveStatus 3=====',this.props.reportReturnInfo);
          let reportReturnInfo = this.props.reportReturnInfo;
          let reportId = reportReturnInfo.id;
          let modelId =  reportReturnInfo.modelid;
          let projectId = reportReturnInfo.projectid
          let userId = reportReturnInfo.userid;
          
          this.props.updateCreditsStatus(this.state.pid,this.state.cid);

          //跳转至报告预览
          //self.href='';
          browserHistory.push('/hpx2/core/enterprise-reporting/{}/admittance/?id='+reportId);
        }else{
          
          //失败后处理
          message.error('系统繁忙，请稍后重试！');

        }
          //停止掉
          clearInterval(timer);
       }

    }, 1000);

  }

  pushRepeatArra =(obj) =>{
   let flag  = 0;
   for(let i = 0; i < targetInfosInfo.length; i ++){
      if(obj.cardId == targetInfosInfo[i].cardId  && obj.tag == targetInfosInfo[i].tag){
        flag++;
      }
    }
    if( flag == 0 ){
        targetInfosInfo.push(obj);
    }
  }

  openNotificationWithIcon = (type,title,msg) => {
    notification[type]({
      message: title,
      description: msg
    });
  };

  render() {
    const optionOne = this.props.industryList.data;
    const optionTwo = this.props.modelList.data;
    const isShow = this.props.isShow;
    const provinceOptions = optionOne.map(o1 => <Option key={o1.id}>{o1.industryName}</Option>);
    const provinceOptions2 = optionTwo.map(o2 => <Option key={o2.id}>{o2.gradeCardName}</Option>);
    provinceOptions.unshift(<Option key='0'>请选择</Option>);
    let modelInfo = this.props.scoringmodel;
    let targetIndexTmp  = 0;
    let cards = modelInfo.labelInfos.map(
      (v,i) =>{
         return <Card key={i} title= {v.scoreCardName} style={{ width: '90%',marginTop:'10px'}}>
           { v.targetInfos.map(
               (vt,it) => {
                 this.pushRepeatArra({'no':targetIndex++,'tag':vt.name,'cardId': v.id,'index':it,'value':'','done':false});
                 let icon = targetInfosInfo[targetIndexTmp++].done;
                 return <p key={it} style={{lineHeight:'50px',borderBottom:'1px dashed #ccc'}}>
                  <span>{vt.name}</span>
                  {icon ? <span style={{color:'green',float:'right',marginLeft:'10px'}}><Icon type="check-circle-o" /></span>
                  :<span style={{color:'red',float:'right',marginLeft:'10px'}}><Icon type="close-circle-o"/></span>}
                  <span style={{float:'right'}}>
                      <Select size='default' defaultValue='请选择' style={{ width: 200 }} onChange={this.onThreeLevelChange}>
                      {vt.modelTargetInfos.map(vo =><Option key={v.id+'@'+it+'@'+vo.id}>{vo.threeLevel}</Option>)}
                      </Select>
                  </span>
                 </p>
               }
           )}
          </Card> 
      });
                
    console.log('targetInfosInfo',targetInfosInfo);

    return (
      <div style={{width:'100%'}}>
        <Spin spinning={this.props.smSaveStatus.loading} >
        <div>
           <Card title='模型选择' style={{ width: '90%' }}>
            <p>
              <Select size='large' defaultValue='请选择' style={{ width: 200,marginRight:'20px' }} onChange={this.handleOptionChange}>
                {provinceOptions}
              </Select>
              <span></span>
              <Select size='large' value={this.state.modelData} style={{ width: 200,marginRight:'20px' }} onChange={this.onSecondOptinChange}>
                {provinceOptions2}
              </Select>
              <Button onClick={this.onOptionSubmit} >确定</Button>
            </p>
           </Card>
        </div>
        <div className = {this.state.cardCss}> 
          <Spin spinning={this.props.smStatus.loading}>
            <Card title={modelInfo.gradeCardName} style={{ width: '90%',marginTop:'20px' }}>
              <p>
                <span style={{marginRight:'15px'}}>预期不良率 :</span>
                <InputNumber min={1} max={100}  value={this.state.badRate} onChange={this.onInputChange} /> %  
                <span>(注：预期不良率请填写1-100之前数字)</span>
              </p>
              <p>
                {cards}
              </p>
               <p style={{marginTop:'20px',textAlign:'center'}}>
                <Button onClick={this.onReportSubmit}>提交</Button>
              </p>
            </Card>
          </Spin>
        </div>
        </Spin>
      </div>
    );
  }
}


Detail.propTypes = {
  // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Detail);



