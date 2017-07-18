import React from 'react'
import { Layout } from 'antd'
import Header from '../../components/MyHeader'
import '../../styles/core.less'
import '../CoreLayout/components/CoreLayout.css'
class App extends React.Component{

    render(){
        const children = this.props.children;
        const { logOut,login } = this.props
        return (
            <Layout id='layout'>
                <Header logOut={logOut} login={login} />
                {children}
            </Layout>
        )
    }
}

export default App