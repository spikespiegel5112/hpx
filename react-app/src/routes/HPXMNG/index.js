import { injectReducer } from '../../store/reducers'
import { auth,authRouter } from '../../modules/route'

export default (store)=>({
    path:'hpxmng',

    indexRoute : {
        onEnter : (next,replace)=>replace('/hpx2/hpxmng/home')

    },

    getChildRoutes (location, cb) {

        require.ensure([], (require) => {

            const routes = [
                // HPXMNG平台
                require('../CORE/Home').default(store),
                require('./enterpriseUser').default(store),
                require('./Projects').default(store),
                require('./ProjectsAudit').default(store),
                require('./user').default(store),
                require('./Proudct').default(store),
                require('./CompanyManager').default(store),
                require('./enterpriseRole').default(store),
                require('./accreditation').default(store),
                require('./accreditation').default(store),
                require('./accreditation').default(store),
                require('./add-service-approve').default(store),
                require('./HpxRole').default(store),

                require('./Test2').default(store),

            ];

            cb(null,routes)

        })
    }
})