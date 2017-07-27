import { injectReducer } from '../../../../store/reducers'
import { auth } from '../../../../modules/route'

export default (store) => ({

  path : 'addCard(/:id)',

  onEnter: auth.bind(this,store),

  getComponent (nextState, cb) {

    require.ensure([], (require) => {

      const AddCard = require('./containers/AddCardContainer').default
      cb(null, AddCard)
      
    }, 'addCard')

  }
})
