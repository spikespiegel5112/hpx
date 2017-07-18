import React from 'react'
import { Input, Button , Popconfirm} from 'antd'
const ButtonGroup = Button.Group

class EditeTableCion extends React.Component{
    constructor(props){
        super(props);
    
    }

    render(){
        const  { isEdite,editeDone,edite} = this.props
        return (
          
            <div>
            {
                isEdite ? 
               <span>
                  <a href='javascript:void(0)' onClick={editeDone}>保存</a>
                  <span className="ant-divider" />
                  <Popconfirm title="确定还原?" onConfirm={editeDone}>
                    <a href='javascript:void(0)'>还原</a>
                  </Popconfirm>
                </span>
                :
                <span>
                  <a href='javascript:void(0)' onClick={edite}>编辑</a>
                </span>
            }
            </div>
        ) 
    }
}

export default EditeTableCion