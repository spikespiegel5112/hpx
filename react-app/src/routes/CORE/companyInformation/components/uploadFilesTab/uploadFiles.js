import React from 'react'
import { Upload, message, Button, Icon,Table ,Modal} from 'antd'
import { getReq } from '../../../../../core/fetch'
import './uploadFiles.css'
import moment from 'moment'
const dateFormat = 'YYYY/MM/DD';

const FileView = ()=>{
    return <div className="ant-upload-list ant-upload-list-text">
                <div className="ant-upload-list-item ant-upload-list-item-uploading">
                    <div className="ant-upload-list-item-info">
                        <span>
                            <i className="anticon anticon-spin anticon-loading"></i>
                            <span className="ant-upload-list-item-name" title="640.jpg">640.jpg</span>
                        </span>
                    </div>
                    <i title="删除文件" className="anticon anticon-cross"></i>
                    <div className="ant-upload-list-item-progress">
                        <div className="ant-progress ant-progress-line ant-progress-status-normal">
                            <div>
                                <div className="ant-progress-outer">
                                    <div className="ant-progress-inner">
                                        <div className="ant-progress-bg" style={{width:'0%',height: 2}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

const PicView = (props) => {
    

    return <div className="ant-upload-list ant-upload-list-picture-card">
                <div className="ant-upload-list-item ant-upload-list-item-done">
                    <div className="ant-upload-list-item-info">
                        <span>
                            <a className='ant-upload-list-item-thumbnail' href='' target="_blank" rel="noopener noreferrer">
                                <img src='' alt='' />
                            </a>
                            <span className="ant-upload-list-item-name" title="640.jpg">640.jpg</span>
                        </span>
                    </div>
                    <span className="ant-upload-list-item-actions">
                        <a href='' target="_blank" rel="noopener noreferrer" title="预览文件">
                            <i className="anticon anticon-eye-o"></i>
                        </a>
                        <i title="删除文件" className="anticon anticon-delete"></i>
                    </span>
                </div>
            </div>
}


const PicList = (props) => {
    return <div className="ant-upload-list ant-upload-list-picture">
                <div className="ant-upload-list-item ant-upload-list-item-done">
                    <div className="ant-upload-list-item-info">
                        <span>
                            <a className="ant-upload-list-item-thumbnail" href={props.thumbUrl} target="_blank" rel="noopener noreferrer">
                                <img src={props.thumbUrl} alt={props.name} />
                            </a>
                            <span className="ant-upload-list-item-name" title={props.name}>{props.name}</span>
                        </span>
                    </div>
                    <i title="删除文件" className="anticon anticon-cross"></i>
                </div>
            </div>
}

class UploadTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filesList : []
        }
        this.eid = props.eid;
        this.filesCode = 'enterpris_file';

        this.filesListUrl = `/core/core/api/v1/enterprise/${this.eid}/dictionary`;

        this.filesProps = (eid,code,index)=>({
            action   : `/core/core/api/v1/enterpriseFiles/enterprise/${eid}/dictionary/${code}/enterpriseFiles`,
            listType : "picture",
            id       : `files${code}`,
            onChange : (response)=>{
                console.log(eid,code,index)
                const { file ,filesList} = response
                const stateFiles = [...this.state.filesList]
                if(file.status === 'done'){
                    message.success('上传成功!');
                    // const { size , name , thumbUrl} = file;
                    stateFiles[index].filesname = file.name;
                    stateFiles[index].filesSize = file.size;
                    stateFiles[index].info.push({name :file.name,thumbUrl:file.thumbUrl});
                    this.setState({
                        filesList : stateFiles,
                    })
                }
                console.log(this.state.filesList)
            },
        });
        this.columns = [
            {
                title : '文件类型',
                key : 'name',
                dataIndex : 'name',
            },
            {
                title : '文件名称',
                key : 'filesname',
                dataIndex : 'filesname',
            },
            {
                title : '文件大小',
                key : 'filesSize',
                dataIndex : 'filesSize',
            },
            {
                title : '上传人',
                key : 'modifiedBy',
                dataIndex : 'modifiedBy',
            },
            {
                title : '上传时间',
                key : 'modifiedTime',
                dataIndex : 'modifiedTime',
                render : (text)=> <span>{moment(text).format('YYYY-MM-DD')}</span>
            },
            {
                title : '文件信息',
                key : 'info',
                dataIndex : 'info',
                render :(text,record)=>{
                    console.log(text)
                    const view = text.length ? text.map((v,i)=>{
                        return <PicList thumbUrl={v.thumbUrl} name={v.name} />
                    })
                    :
                    null;
                   return <div className='acc-files-view'>{view}</div>
                }
            },{
                title :'操作',
                key:'action',
                width:300,
                render : (text,record,index)=>{
                    let ret = null;
                    ret = this.props.isAllEdite ? 
                       <div className='acc-files-action'>      
                            <Upload 
                            {...this.filesProps(this.eid,record.code,index)}>
                                <Button>
                                    <Icon type="upload" />上传
                                </Button>
                            </Upload>
                            {
                                record.code === 'powerOfAttorney' ?
                                <div> 
                                    <Button>
                                        <Icon type='download' />授权书
                                    </Button>
                                </div>
                                :
                                null
                            }
                            
                        </div>
                    :
                    <div>请等待审核或联系邻客重新上传</div>;
                    return ret;
                }         
            }
        ]
    }
    
    getFiles(){
        (async ()=>{
            try{
                let resp = await getReq(this.filesListUrl,{code:this.filesCode});                
                let res = await resp.json();
                console.log(res)
                for(let i = 0 , len = res.length; i < len ; i++){
                    res[i].filesname = '';
                    res[i].filesSize = '';
                    res[i].info = [];
                }
                this.setState({
                    filesList : res
                })
            }catch(e){
                message.error(e);
            }        
        })()
        
    }

    componentDidMount(){
        this.getFiles()
    }

    render(){
        const { filesList } = this.state;
        return (
            <div>
                <Table
                className='upload-files-c'
                rowKey='id'
                columns={this.columns}
                dataSource={filesList}
                pagination={false}
                />
                <Modal>
                    
                </Modal>
            </div>
        )
    }
}

export default UploadTable
