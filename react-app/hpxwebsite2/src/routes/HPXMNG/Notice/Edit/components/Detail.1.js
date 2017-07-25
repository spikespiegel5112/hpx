import React from 'react'
import {IndexLink,Link,withRouter,browserHistory} from 'react-router'
import moment from 'moment'
import {postReq} from '../../../../../core/fetch'
import './Detail.css'
import { Row, Col, Card,Input,Button,Radio,Checkbox,Select,DatePicker } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getDicData } from '../../../../../core/util'
import { convertFromHTML,ContentState,EditorState, } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';

/*const contentBlocks = convertFromHTML('<p>Lorem ipsum ' +
      'dolor sit amet, consectetur adipiscing elit. Mauris tortor felis, volutpat sit amet ' +
      'maximus nec, tempus auctor diam. Nunc odio elit,  ' +
      'commodo quis dolor in, sagittis scelerisque nibh. ' +
      'Suspendisse consequat, sapien sit amet pulvinar  ' +
      'tristique, augue ante dapibus nulla, eget gravida ' +
      'turpis est sit amet nulla. Vestibulum lacinia mollis  ' +
      'accumsan. Vivamus porta cursus libero vitae mattis. ' +
      'In gravida bibendum orci, id faucibus felis molestie ac.  ' +
      'Etiam vel elit cursus, scelerisque dui quis, auctor risus.</p>');

const contentState = ContentState.createFromBlockArray(contentBlocks);
// const initialContentState = convertToRaw(contentState);
const sampleEditorContent = EditorState.createWithContent(contentState);

*/


const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;
const options = [];
const dateFormat = 'YYYY/MM/DD';
const rawContentState = {};
let editId = null;

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: undefined,
      contentState: rawContentState,
      editorState: null,
      isTop: '0',
      title: '',
      pubType:'',
      pubWay:[],
      pubWayStr:'',
      endTime:''
    };
  }
  componentWillMount() {
    editId = null;
    if(this.props.params.id){
        editId = this.props.params.id;
        this.props.fetchDetail(this.props.params.id);
    }
    this.props.fetchDic('PUB_TYPE');
    this.props.fetchDic2('PUB_WAY');
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    const {
      saveStatus,
      fetchDetailStatus,
      err,detailData
    } = nextProps;

    if (this.props.fetchDetailStatus.type != fetchDetailStatus.type &&
          fetchDetailStatus.type.match('SUCCESS')
        ){ 
          console.log('haha',detailData);
          if(detailData){
            console.log('haha2',detailData);
            //let content = JSON.parse(detailData.content);
            console.log('content',detailData.content);
            const contentBlocks = convertFromHTML(detailData.content);
            console.log('contentBlocks',contentBlocks);
            const contentState = ContentState.createFromBlockArray(contentBlocks);
            console.log('contentState',contentState);
            const sampleEditorContent = EditorState.createWithContent(contentState);
            console.log('sampleEditorContent',sampleEditorContent);

            this.setState({
              editorContent:contentBlocks,
              contentState:contentState,
              editorState:sampleEditorContent,
              isTop: detailData.istop,
              title: detailData.title,
              pubType: detailData.type,
              pubWay: detailData.direction.split(','),
              pubWayStr: detailData.direction,
              endTime: moment( detailData.endTime).format('YYYY-MM-DD')
            });
          }

        }
    if (
      this.props.saveStatus.type != saveStatus.type &&
      saveStatus.type.match('SUCCESS')
    ) { //保存成功，返回上一页，这里没对上一页为空的情况做处理
      message.success('保存成功');
      browserHistory.go(-1);
    }
    if (err) { //拉取列表失败，提示错误信息
      message.error(err);
      this.props.clearErr();
    }
  }

  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  clearContent = () => {
    this.setState({
      contentState: '',
    });
  };

  onContentStateChange = (contentState) => {
     this.setState({
      contentState,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  /*imageUploadCallBack = (file) =>{ 
    return new Promise(
        (resolve, reject) => {*/
            /*const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });*/

           /* let imgflag = this.beforeUpload();
            if(imgflag){
              this.getBase64(file)
            }
        }
    );
  }*/


     imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        }
    );


  
  onChangeIsTop = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      isTop: e.target.value,
    });
  }

  onChangeTitle = (e) =>{
    console.log('input text', e.target.value);
     this.setState({
      title: e.target.value,
    });
  }

  onChangePubWay = (checkedValues)=> {
    console.log('checked = ', checkedValues);
    let pubWayStr = '';
    for(let i =0 ;i<checkedValues.length;i++){
      pubWayStr = pubWayStr ==''? pubWayStr+=checkedValues[i] : ','+checkedValues[i] ;
    }
    this.setState({
      pubWay:checkedValues,
      pubWayStr:pubWayStr
    });
  }

  onChangePubType = (value)=> {
     console.log(`selected ${value}`);
     this.setState({
      pubType:value
    });
  }

  onChangeValidperiod= (date, dateString)=> {
     console.log(date, dateString);
      this.setState({
      endTime:dateString
    });
  }

  onSubmitNotice = () =>{

    let sendData = {
      title:'',
      type:'',
      content:null,
      enterpriseId:'',
      istop:'',
      endTime:'',
      direction:''
    };

   /* let content = {
      editorContent: null,
      contentState: null,
      editorState: null,
    }*/

    sendData.title = this.state.title;
    sendData.type = this.state.pubType;
    let pubWayStr = '';
    if(this.state.pubWay){
      this.state.pubWay.map(v =>{pubWayStr ==''? pubWayStr+=v : ','+v});
    }
    sendData.direction = pubWayStr;
    /*content.editorContent = this.state.editorContent;
    content.contentState = this.state.contentState;
    content.editorState = this.state.editorState
    sendData.content = JSON.stringify(content);*/
    sendData.content = draftToHtml(this.state.editorContent);
    sendData.istop = this.state.isTop;
    sendData.endTime =moment(this.state.endTime).format('YYYY-MM-DD')
    console.log('result',sendData);

    if(editId){
        this.props.save(sendData,editId);
    }else{
        this.props.save(sendData);
    }
  }

 getBase64 = (img, callback) =>{
   const reader = new FileReader();
   reader.addEventListener('load', () => callback(reader.result));
   reader.readAsDataURL(img);
 }

  getBase64 = (img) =>{
   const reader = new FileReader();
   reader.readAsDataURL(img);
   console.log('reader',reader);
  }
 
 beforeUpload = (file) =>{
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

  render() {
    const pubType = this.props.dicList.data;
    const pubWay = this.props.dicList2.data;

    //发布类型下拉
    const pubTypeOptions = pubType.map(o1 => <Option key={o1.id} value={o1.code} >{o1.name}</Option>);

    //清空数组
    options.splice(0,options.length);

    //发布方向多选
    pubWay.map((o2,index) => options.push({ 'key': index+1, 'label': o2.name, 'value': o2.code}));

    var endTime = this.state.endTime ? this.state.endTime : new Date ();
    const { editorContent, editorState,contentState } = this.state;

    return (
        <div className="gutter-example button-demo">
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                  <div className="gutter-box">
                      <Card title="基本信息" bordered={false} >
                        <p style={{lineHeight:'50px'}}>
                          <span style={{width:'9%',float:'left'}}>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                          <span><Input style={{width:'50%'}} value={this.state.title} onChange={this.onChangeTitle} /></span>
                      </p>
                        <p style={{lineHeight:'50px'}}>
                          <span style={{width:'9%',float:'left'}}>发布方向：</span>
                          <span>
                            <CheckboxGroup options={options} value={this.state.pubWay} onChange={this.onChangePubWay} />
                          </span>
                        </p>
                        <p style={{lineHeight:'50px'}}>
                          <span style={{width:'9%',float:'left'}}>发布类型：</span> 
                          <span>
                            <Select
                              showSearch
                              value={this.state.pubType}
                              style={{ width: 200 }}
                              placeholder="选择发布类型"
                              optionFilterProp="children"
                              onChange={this.onChangePubType}
                              style={{width:'200px'}}
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                              {pubTypeOptions}
                            </Select>
                          </span>
                        </p>
                        <p style={{lineHeight:'50px'}}>
                          <span style={{width:'9%',float:'left'}}>有&nbsp;&nbsp;效&nbsp;&nbsp;期：</span> 
                          <span>
                            <DatePicker onChange={this.onChangeValidperiod}
                            value={moment(endTime, dateFormat)} format={dateFormat}
                            style={{width:'200px'}}/>
                          </span>
                        </p>
                        <p style={{lineHeight:'50px'}}>
                          <span style={{width:'9%',float:'left'}}>是否置顶：</span>
                          <span> 
                            <RadioGroup onChange={this.onChangeIsTop} value={this.state.isTop}>
                            <Radio value='1'>是</Radio>
                            <Radio value='0'>否</Radio>
                          </RadioGroup>
                        </span>
                        </p>
                      </Card>
                  </div>
                </Col>
                <Col className="gutter-row" span={24}>
                    <div className="gutter-box" style={{marginTop:'20px'}}>
                        <Card title="内容编辑" bordered={false} >
                            <Editor
                                //contentState={editorContent}
                                //contentState = {editorContent}
                                //defaultEditorState = {rawContentState}
                                //defaultContent = {rawContentState}
                                editorState={editorState}
                                defaultEditorState={editorState}
                                toolbarClassName="home-toolbar"
                                wrapperClassName="home-wrapper"
                                editorClassName="home-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                    history: { inDropdown: true },
                                    inline: { inDropdown: false },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    image: { uploadCallback: this.imageUploadCallBack },
                                }}
                                onContentStateChange={this.onEditorChange}
                                spellCheck
                                onFocus={() => {console.log('focus')}}
                                onBlur={() => {console.log('blur')}}
                                onTab={() => {console.log('tab'); return true;}}
                                localization={{ locale: 'zh', translations: {'generic.add': 'Test-Add'} }}
                            />

                            <style>{`
                                .home-editor {
                                    min-height: 300px;
                                }
                            `}</style>
                        </Card>
                    </div>
                </Col>
                 <Col className="gutter-row" span={8}>
                        <Card title="同步转换HTML" bordered={false}>
                            <pre>{draftToHtml(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card title="同步转换MarkDown" bordered={false}>
                            <pre style={{whiteSpace: 'pre-wrap'}}>{draftToMarkdown(editorContent)}</pre>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Card title="同步转换JSON" bordered={false}>
                            <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                        </Card>
                    </Col>
                <Col className="gutter-row" span={24}>
                    <Button onClick={this.onSubmitNotice}>保存</Button> <Button>取消</Button>
                </Col>
            </Row>
        </div>
        );
    }
}
Detail.propTypes = {
  // increment   : React.PropTypes.func.isRequired
}

export default withRouter(Detail)