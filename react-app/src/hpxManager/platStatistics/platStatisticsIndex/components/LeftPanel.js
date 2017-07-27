import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'

// import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../core/fetch';

export default class LeftPanel extends React.Component {
    constructor(props){ //es6 class类
        super(props);
        this.init = this.init.bind(this)
        this.state={
            data : []
        }
    }

    componentDidMount() {
        this.init(null);
    }
    componentWillReceiveProps(nextProps) {
        this.init(nextProps)
    }
    init(nextProps) {
        console.log("nextProps",nextProps);
        const data  = !nextProps ? this.props :nextProps.data.panelData ;
        console.log("panelData",data);
        const panels  = !data.data ? null : data.data.map(function(info,index){
            return (
                <div key={index} style={{marginTop:index==0?60:20}}>
                    <p>{info[0].name} : {info[0].value}</p>
                    <p>{info[1].name} : {info[1].value} {info[1].increase}</p>
                    <p>{info[2].name} : {info[2].value} {info[1].increase}</p>
                </div>
            );
        });
        this.setState({
            data :  panels
        })
    }

    render() {
        return (
            <div className="LeftPanel-react" ref="LeftPanelReact">
                { this.state.data }
            </div>
        );  
    }
}