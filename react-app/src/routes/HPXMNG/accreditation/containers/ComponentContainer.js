import { connect } from 'react-redux'

import Compo from '../components/Component'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  eid : state.login.userInfo.enterpriseId //这里获取 用户/企业 Id 请求数据是可能用到 
})


export default connect(mapStateToProps, mapDispatchToProps)(Compo)
