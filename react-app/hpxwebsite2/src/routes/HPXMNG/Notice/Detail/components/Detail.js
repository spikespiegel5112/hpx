import React from 'react'
import {IndexLink,Link,withRouter,browserHistory} from 'react-router'
import moment from 'moment'
import {postReq} from '../../../../../core/fetch'
import './Detail.css'
import { Row, Col, Card,Input,Button,Radio,Checkbox,Select,DatePicker } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getDicData } from '../../../../../core/util'
//import draftToHtml from 'draftjs-to-html';
//import draftToMarkdown from 'draftjs-to-markdown';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

const options = [];

const rawContentState = {
  "entityMap": {
    "0": {
      "type": "IMAGE",
      "mutability": "MUTABLE",
      "data": {
        "src": "http://i.imgur.com/aMtBIep.png",
        "height": "auto",
        "width": "100%"
      }
    }
  },
  "blocks": [{
    "key": "9unl6",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "95kn",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
      "offset": 0,
      "length": 1,
      "key": 0
    }],
    "data": {}
  }, {
    "key": "7rjes",
    "text": "",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }]
};


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: undefined,
      contentState: rawContentState,
      editorState: '',
      isTop: '0',
      title: '',
      pubType:'',
      pubWay:'',
      endTime:'',
      direction:''
    };
  }
  componentWillMount() {
    this.props.fetchDetail(this.props.params.id);
    /*getDicData('PUB_TYPE').then(function(json) {
       pubType = json;
    }, function(error) {
      console.error('出错了', error);
    });

    getDicData('PUB_WAY').then(function(json) {
      pubWay = json;
    }, function(error) {
      console.error('出错了', error);
    });*/


   //let dd =  getDicData('PUB_WAY');
   //console('dd',dd);

   this.props.fetchDic('PUB_TYPE');
   this.props.fetchDic2('PUB_WAY');

  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    const {
      saveStatus,
      fetchDetailStatus,
      err
    } = nextProps;
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
    console.log('contentState', contentState);
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

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
    this.setState({
      pubWay:checkedValues
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
    /*    {
  "content": "string",
  "createTime": "2017-07-06T02:10:29.259Z",
  "creator": 0,
  "endTime": "2017-07-06T02:10:29.259Z",
  "enterpriseId": 0,
  "id": 0,
  "istop": "string",
  "modifiedBy": 0,
  "modifiedTime": "2017-07-06T02:10:29.259Z",
  "picPath": "string",
  "publishState": "string",
  "startTime": "2017-07-06T02:10:29.259Z",
  "title": "string",
  "type": "string",
  "url": "string"
}*/

    let sendData = {
      title:'',
      type:'',
      content:'',
      enterpriseId:'',
      istop:'',
      endTime:'',
      direction:''
    };

    sendData.title = this.state.title;
    sendData.type = this.state.pubType;
  //  sendData.pubWay = this.state.pubWay;
    sendData.content = JSON.stringify(this.state.editorContent);
    sendData.istop = this.state.isTop;
    sendData.endTime = this.state.endTime;

    console.log('result',sendData);

    this.props.save(sendData);

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

    console.log('pubtype2', pubType);
    console.log('pubWay2', pubWay);

    const { editorContent, editorState } = this.state;
        return (
            <div className="gutter-example button-demo">
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                      <div className="gutter-box">
                         <Card title="基本信息" bordered={false} >
                           <p style={{lineHeight:'50px'}}>
                             <span style={{width:'9%',float:'left'}}>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                             <span><Input style={{width:'50%'}} onChange={this.onChangeTitle}/></span>
                          </p>
                           <p style={{lineHeight:'50px'}}>
                             <span style={{width:'9%',float:'left'}}>发布方向：</span>
                             <span>
                               <CheckboxGroup options={options} onChange={this.onChangePubWay} />
                             </span>
                           </p>
                           <p style={{lineHeight:'50px'}}>
                             <span style={{width:'9%',float:'left'}}>发布类型：</span> 
                             <span>
                               <Select
                                  showSearch
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
                               <DatePicker onChange={this.onChangeValidperiod} style={{width:'200px'}}/>
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
                                    editorState={editorState}
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
                   {/* <Col className="gutter-row" span={24}>
                        <Card title="同步转换JSON" bordered={false}>
                            <pre style={{whiteSpace: 'normal'}}>{JSON.stringify(editorContent)}</pre>
                        </Card>
                    </Col>*/}
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