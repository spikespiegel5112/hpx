import React from 'react'

import './cardTitle.css'

class CardTitle extends React.Component{
    render(){
        return (
            <span className='card-title'>
                {this.props.title}
            </span>
        )
    }
}

export default CardTitle


