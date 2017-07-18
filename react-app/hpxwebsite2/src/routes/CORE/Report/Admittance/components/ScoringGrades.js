import React,{Component} from 'react';
import './ScoringGrades.css'

export class ScoringGrades extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        var score = this.props.score+'%'
        return (
        <div style={{width:'50%'}}> 
            <div className="gradient" style={{width:'100%',height:'30px'} }></div>
            <div className="triangle-bottom" style={{marginLeft: score }}></div>
            <div style={{marginLeft: score }}>{this.props.score}分</div>
        </div>
        )
    }
}