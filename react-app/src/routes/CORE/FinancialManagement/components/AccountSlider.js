import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import Slider from 'react-slick'
import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';
export default class AccountSlider extends React.Component {
    constructor(props){ //es6 class类
        super(props);
        this.state={
            data : [],
            accName : "",
            bankNo : "",
            bankName : "" 
        }
    }
    componentWillMount() {
        this.fetch()()
    }

    fetch(){
        return async()=>{
            const resp =await getReq('/core/core/api/v1/financialManager/accountInfos');
            const res = await resp.json();
            res.map(function(item, i) {
                if(i==0){
                    this.setState({
                        accName : item.accName,
                        bankNo : item.bankNo,
                        bankName : item.bankName
                    })  
                    return;
                }
            }, this); 
            this.setState({
                data :  res
            })
        }
    }

    showInfo(index){
        var account = this.state.data[index];
        this.setState({
            accName : account.accName,
            bankNo : account.bankNo,
            bankName : account.bankName
        });
        this.props.updateList(account.accId)

    }
    
   render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    // const respons = [{"accId":"1","bankNo":"1001","bankName":"中信银行","bankAmt":"567.09"},
    //      {"accId":"2","bankNo":"1002","bankName":"平安银行","bankAmt":"567.09"},
    //      {"accId":"3","bankNo":"1003","bankName":"中国银行","bankAmt":"567.09"}];
    const respons = this.state.data
    const accountInfos =  respons.map(function(account,index){
            return (
                    <div id={account.accId} style={{textAlign:'-',color:'#FFA500'}}>
                        <p>尾号：{account.bankNo}</p>
                        <p>开户行：{account.bankName}</p>
                        <p>余额：{account.bankAmt}</p>
                    </div>
                );
    });
    return (
        <div>
            <div style={{ marginBottom: 100,width:600,marginLeft:200,backgroundColor:"while",textAlign:"center"}}>
                {this.state.data.length ? <Slider {...settings} afterChange={(index)=>this.showInfo(index)}>{accountInfos}</Slider> : null}

                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </div>
            <div style={{ marginBottom:20}}>
                <div style={{float:"left",marginLeft:10}}>
                    <p>账户名：{this.state.accName}</p>
                </div>
                <div style={{float:"left",marginLeft:60}}>
                    <p>银行账号：{this.state.bankNo}</p>
                </div>
                <div style={{marginLeft:500}}>
                    <p>开户行：{this.state.bankName}</p>
                </div>
            </div>
            
        </div>
    );
  }
}