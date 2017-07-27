import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'
import { postReq } from '../../../../../core/fetch'
import { PieReact }  from './PieReact.js'
import './Admittance.css'


class Admittance extends React.Component {
  constructor(props){
    super(props);
  }
    componentWillMount() {
        var id =this.props.location.query.id;
        this.props.fetchReport(id);
    }
  render() {
    const reportlist = this.props.reportlist
    return(
        <div>
            <PieReact reportlist={reportlist} name={name}/>
        </div>
    )
  }
}

export default withRouter(Admittance)
