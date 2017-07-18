import React, { PropTypes } from 'react';
// import className from '../../node_modules/classname/classname';

class Input extends React.Component {
  
  constructor(props) {
    super();
  } 

  handleChange(event) {
    this.props.parentChange(event.target.value);
  }

  haveFocus(event) {
    this.props.parentChange(event.target.value,'focus');
  }

  lostFocus(event) {
    this.props.parentChange(event.target.value,'blur');
  }

  render() {
    const {type, placeholder, value, parentChange, ...props} = this.props;
    return (    
      <input type={type} 
        value={value} placeholder={placeholder} {...props}
        onChange={this.handleChange.bind(this)}
        onFocus={this.haveFocus.bind(this)}
        onBlur={this.lostFocus.bind(this)}
      />
    );
  }
}


export default Input;



