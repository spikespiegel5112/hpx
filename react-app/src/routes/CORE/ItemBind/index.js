
import {auth } from '../../../modules/route'

const companyInformation  = (store) => ({

    path : 'item-bind',

    onEnter : auth.bind(this,store),

    getComponent ( nextState, cb ){ 

        require.ensure([],(require)=>{

          const Comp = require('./container').default;

          cb(null,Comp);

        },'itemBind')
    }

})

export default companyInformation