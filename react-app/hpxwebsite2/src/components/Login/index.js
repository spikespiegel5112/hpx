import { injectReducer } from '../../store/reducers'
const Login = (store)=>({
    path : 'login',
    getComponent (nextState, cb) {
      require.ensure([], (require) => {
        const Component = require('./loginContainer').default
        cb(null, Component)
      }, 'login')
    },
})

export default Login
