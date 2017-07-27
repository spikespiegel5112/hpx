import React from 'react'
import { IndexLink, Link, withRouter, browserHistory } from 'react-router'

class Compo extends React.Component {
  constructor(props) {
    super(props);
    }

  componentWillMount() {
    
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
   
  }

  render() {
    const view = <div>
      404页面
    </div>

    return view;
  }
}

Compo.propTypes = {
}

export default withRouter(Compo)
