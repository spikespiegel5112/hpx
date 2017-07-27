import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';

// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'projectsModule::';
export const UPDATE_QUERY_PARAMS = ACTION_PREFIX + 'UPDATE_QUERY_PARAMS'
export const CLEAR_QUERY_PARAMS = ACTION_PREFIX + 'CLEAR_QUERY_PARAMS'

export const CLEAR_ERR = ACTION_PREFIX + 'CLEAR_ERR'

export const FETCH_LIST_NOT = ACTION_PREFIX + 'FETCH_LIST_NOT'
export const FETCH_LIST_REQUEST = ACTION_PREFIX + 'FETCH_LIST_REQUEST'
export const FETCH_LIST_FAILURE = ACTION_PREFIX + 'FETCH_LIST_FAILURE'
export const FETCH_LIST_SUCCESS = ACTION_PREFIX + 'FETCH_LIST_SUCCESS'

export const FETCH_DETAIL_NOT = ACTION_PREFIX + 'FETCH_DETAIL_NOT'
export const FETCH_DETAIL_REQUEST = ACTION_PREFIX + 'FETCH_DETAIL_REQUEST'
export const FETCH_DETAIL_FAILURE = ACTION_PREFIX + 'FETCH_DETAIL_FAILURE'
export const FETCH_DETAIL_SUCCESS = ACTION_PREFIX + 'FETCH_DETAIL_SUCCESS'

export const FETCH_PRODUCT_NOT = ACTION_PREFIX + 'FETCH_PRODUCT_NOT'
export const FETCH_PRODUCT_REQUEST = ACTION_PREFIX + 'FETCH_PRODUCT_REQUEST'
export const FETCH_PRODUCT_FAILURE = ACTION_PREFIX + 'FETCH_PRODUCT_FAILURE'
export const FETCH_PRODUCT_SUCCESS = ACTION_PREFIX + 'FETCH_PRODUCT_SUCCESS'

export const FETCH_FIRM_NOT = ACTION_PREFIX + 'FETCH_FIRM_NOT'
export const FETCH_FIRM_REQUEST = ACTION_PREFIX + 'FETCH_FIRM_REQUEST'
export const FETCH_FIRM_FAILURE = ACTION_PREFIX + 'FETCH_FIRM_FAILURE'
export const FETCH_FIRM_SUCCESS = ACTION_PREFIX + 'FETCH_FIRM_SUCCESS'

export const FETCH_ENTERPRISE_NOT = ACTION_PREFIX + 'FETCH_ENTERPRISE_NOT'
export const FETCH_ENTERPRISE_REQUEST = ACTION_PREFIX + 'FETCH_ENTERPRISE_REQUEST'
export const FETCH_ENTERPRISE_FAILURE = ACTION_PREFIX + 'FETCH_ENTERPRISE_FAILURE'
export const FETCH_ENTERPRISE_SUCCESS = ACTION_PREFIX + 'FETCH_ENTERPRISE_SUCCESS'

export const FORBIDDEN_NOT = ACTION_PREFIX + 'FORBIDDEN_NOT'
export const FORBIDDEN_REQUEST = ACTION_PREFIX + 'FORBIDDEN_REQUEST'
export const FORBIDDEN_FAILURE = ACTION_PREFIX + 'FORBIDDEN_FAILURE'
export const FORBIDDEN_SUCCESS = ACTION_PREFIX + 'FORBIDDEN_SUCCESS'

export const SAVE_NOT = ACTION_PREFIX + 'SAVE_NOT'
export const SAVE_REQUEST = ACTION_PREFIX + 'SAVE_REQUEST'
export const SAVE_FAILURE = ACTION_PREFIX + 'SAVE_FAILURE'
export const SAVE_SUCCESS = ACTION_PREFIX + 'SAVE_SUCCESS'

export const UPDATE_NOT = ACTION_PREFIX + 'UPDATE_NOT'
export const UPDATE_REQUEST = ACTION_PREFIX + 'UPDATE_REQUEST'
export const UPDATE_FAILURE = ACTION_PREFIX + 'UPDATE_FAILURE'
export const UPDATE_SUCCESS = ACTION_PREFIX + 'UPDATE_SUCCESS'

export const DETAIL_NOT = ACTION_PREFIX + 'DETAIL_NOT'
export const DETAIL_REQUEST = ACTION_PREFIX + 'DETAIL_REQUEST'
export const DETAIL_FAILURE = ACTION_PREFIX + 'DETAIL_FAILURE'
export const DETAIL_SUCCESS = ACTION_PREFIX + 'DETAIL_SUCCESS'

export const DELETE_NOT = ACTION_PREFIX + 'DELETE_NOT'
export const DELETE_REQUEST = ACTION_PREFIX + 'DELETE_REQUEST'
export const DELETE_FAILURE = ACTION_PREFIX + 'DELETE_FAILURE'
export const DELETE_SUCCESS = ACTION_PREFIX + 'DELETE_SUCCESS'

export const CREDIT_NOT = ACTION_PREFIX + 'CREDIT_NOT'
export const CREDIT_REQUEST = ACTION_PREFIX + 'CREDIT_REQUEST'
export const CREDIT_FAILURE = ACTION_PREFIX + 'CREDIT_FAILURE'
export const CREDIT_SUCCESS = ACTION_PREFIX + 'CREDIT_SUCCESS'

export const SAVE_CREDIT_NOT = ACTION_PREFIX + 'SAVE_CREDIT_NOT'
export const SAVE_CREDIT_REQUEST = ACTION_PREFIX + 'SAVE_CREDIT_REQUEST'
export const SAVE_CREDIT_FAILURE = ACTION_PREFIX + 'SAVE_CREDIT_FAILURE'
export const SAVE_CREDIT_SUCCESS = ACTION_PREFIX + 'SAVE_CREDIT_SUCCESS'

export const UPDATE_FIELDS = ACTION_PREFIX + 'UPDATE_FIELDS'//更新表单里的值

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

//如果queryParams为假，表示重置查询条件

export const clearQueryParams = () => {
    return {
        type: CLEAR_QUERY_PARAMS,
    }
}

export const clearErr = () => {
    return {
        type    : CLEAR_ERR,
    }
}

export const updateQueryParams = (queryParams) => {
    return {
        type: UPDATE_QUERY_PARAMS,
        payload: {
            queryParams,
        }
    }
}

//查询项目列表
export const fetchList =  () => {
    return async (dispatch, getState) => {
        dispatch({
            type    : FETCH_LIST_REQUEST,
        })
        let list = getState().projectsModule.list;
        let queryParams = Object.assign({},list.queryParams);

        let name = queryParams.name ? queryParams.name.value : null;
        if(name) queryParams.name = queryParams.name.value;
        else delete queryParams.name;

        let pagination = queryParams.pagination;
        queryParams.page = pagination.current;
        queryParams.size = pagination.pageSize;
        delete queryParams.pagination;
        try{
            const resp = await getReq(
                '/core'+'/core/api/v1/projects',
                queryParams
            )
            const total = resp.headers.get('x-total-count');
            const result = await resp.json();
            console.log('result',result);
            let current =
                pagination.pageSize * (pagination.current-1) >= total
                    ? pagination.current -1
                    : pagination.current;
            current = current <= 0 ? 0 : current;
            dispatch({
                type    : FETCH_LIST_SUCCESS,
                payload : {
                    rows: result,
                    total: total,
                    current: current,
                    pageSize: pagination.pageSize
                }
            })
        }catch(e){
            dispatch({
                type    : FETCH_LIST_FAILURE,
                payload : e
            })
        }
    }
}


//获取所有企业信息
export const fetchFirm =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_FIRM_REQUEST,
    }) 
        let firmList = getState().projectsModule.firmList;
        let queryParams = Object.assign({},firmList.queryParams);

        let activated = 'T';
        queryParams.activated = activated;
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/enterprises',
        queryParams
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_FIRM_SUCCESS,
        payload :  result,
      })
    }catch(e){
      dispatch({
        type    : FETCH_FIRM_FAILURE,
        payload : e
      })
    }
  }
}

//获取所有产品类型
export const fetchProduct =  () => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_PRODUCT_REQUEST,
    })
    
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/products'
      )
      const result = await resp.json();
      dispatch({
        type    : FETCH_PRODUCT_SUCCESS,
        payload :  result,
      })
      console.log(9,result)
    }catch(e){
      dispatch({
        type    : FETCH_PRODUCT_FAILURE,
        payload : e
      })
    }
  }
}

//根据产品code获取所有企业角色信息
export const fetchEnterprise =  (productCode) => {
  return async (dispatch, getState) => {
    dispatch({
      type    : FETCH_ENTERPRISE_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/products/'+productCode+'/ent_roles'
      )
      const result = await resp.json();
      console.log("enterpriseList",result)
      dispatch({
        type    : FETCH_ENTERPRISE_SUCCESS,
        payload :  result,
      })
    }catch(e){
      dispatch({
        type    : FETCH_ENTERPRISE_FAILURE,
        payload : e
      })
    }
  }
}

//查看项目明细
export const fetchDetail =  (id) => {
    return async (dispatch, getState) => {
    if(!id){//没有id，就是新增
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          ...initialState.fields
        }
      })
      return;
    }
    dispatch({
      type    : DETAIL_REQUEST,
    })
    try{
      const resp = await getReq(
        '/core'+'/core/api/v1/projects/'+id,
      )
      const result = await resp.json();
      let data = result;
      dispatch({
        type    : DETAIL_SUCCESS,
      })
      dispatch({
        type: UPDATE_FIELDS,
        payload: {
          id: id,//id,添加的时候为空，修改的时候有值
          productCode: {
            value: data.productCode || null
          },
          name: {
            value: data.name || null
          },
          remark: {
            value: data.remark || null
          },
          startTime: {
            value: data.startTime || null
          },
          endTime: {
            value: data.endTime || null
          }
        }
      })
    }catch(e) {
      dispatch({
        type    : DETAIL_FAILURE,
        payload : e
      })
    }
  }
}


//项目禁用
// export  const forbidden =  (id) => {
//   return async (dispatch, getState) => {
//     dispatch({
//       type    : FORBIDDEN_REQUEST,
//     })
//     try{
//       const eid = getState().login.userInfo.enterpriseId;
//       const resp = await patchReq(
//         '/core'+'/core/api/v1/tp/scoringmodel/'+eid+"/state/"+id,
//       )
//       //重新查询加载
//       const resp2 = await getReq(
//         '/core'+'/credit/api/v1/tp/scoringmodel/'+eid,
//       )
//       const result = await resp2.json();
//       dispatch({
//         type: FORBIDDEN_SUCCESS,
//       })
//       dispatch({
//         type    : FETCH_LIST_SUCCESS,
//         payload : {
//           rows: result,
//         }
//       })
//     }catch(e){
//       dispatch({
//         type    : FORBIDDEN_FAILURE,
//         payload : e
//       })
//     }
//   }
// }

export  const del =  (id) => {
    return async (dispatch, getState) => {
        dispatch({
            type    : DELETE_REQUEST,
        })
        try{
            const resp = await deleteReq(
                '/core'+'/core/api/v1/projects/'+id,
                {
                }
            )
            dispatch({
                type: DELETE_SUCCESS,
            })
        }catch(e){
            dispatch({
                type    : DELETE_FAILURE,
                payload : e
            })
        }
    }
}

export const enterpriseCredit =  (pid) => {
    return async (dispatch, getState) => {
        dispatch({
            type    : CREDIT_REQUEST,
        })
        try{
            const resp = await getReq(
                '/core'+'/core/api/v1/enterpriseProjects/'+pid+'/capitalist'
            )
            const result = await resp.json();
            console.log("公司前",result)
            dispatch({
                type    : CREDIT_SUCCESS,
                payload :  result,
            })
        }catch(e){
            dispatch({
                type    : CREDIT_FAILURE,
                payload : e
            })
        }
    }
}

//新增项目
export  const save =  (values,type) => {
    return async (dispatch, getState) => {
        dispatch({
            type    : SAVE_REQUEST,
        })
        try{
            //const eid = getState().login.userInfo.enterpriseId;
            const eid = values.ownerEnterpriseId;
            const resp =await putReq(
                        '/core'+'/core/api/v1/projects/'+eid+'/product/'+type,
                        {
                            ...values,
                        }
                    )
            // const result = await resp.json();
            dispatch({
                type    : SAVE_SUCCESS,
            })
        }catch(e){
            dispatch({
                type    : SAVE_FAILURE,
                payload : e
            })
        }
    }
}

//新增项目
export  const saveCredit =  (enterpriseId, pjId) => {
    return async (dispatch, getState) => {
        dispatch({
            type    : SAVE_CREDIT_REQUEST,
        })
        console.log("请求前", enterpriseId, pjId)
        try{
            const eid = getState().login.userInfo.enterpriseId;
            const resp =await putReq(
                '/core'+'/core/api/v1/enterprise/'+enterpriseId+'/projects/'+pjId+'/credits/'+eid,
            )
            console.log("hehhhhehe")
            dispatch({
                type    : SAVE_CREDIT_SUCCESS,
            })
        }catch(e){
            dispatch({
                type    :SAVE_CREDIT_FAILURE,
                payload : e
            })
        }
    }
}

//修改项目
export  const update =  (values,id) => {
    return async (dispatch, getState) => {
        dispatch({
            type    : UPDATE_REQUEST,
        })
        try{
            const resp =await patchReq(
                        '/core'+'/core/api/v1/projects/'+id,
                        {
                            ...values,
                        }
                    )
            dispatch({
                type    : UPDATE_SUCCESS,
            })
        }catch(e){
            dispatch({
                type    : UPDATE_FAILURE,
                payload : e
            })
        }
    }
}

export const updateFields = (fields,type) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FIELDS,
            payload: {
                ...getState().projectsModule.fields,
                ...fields
            }
        })
    }
}

export const actions = {
    clearQueryParams,
    clearErr,
    updateQueryParams,
    fetchList,
    fetchProduct,
    fetchFirm,
    fetchDetail,
    fetchEnterprise,
    del,
    save,
    saveCredit,
    update,
    updateFields,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [CLEAR_ERR] : (state, action) =>
        ({
            ...state,
            err: '',
        }),
    [UPDATE_QUERY_PARAMS] : (state, action) =>
        ({
            ...state,
            list:{
                ...state.list,
                queryParams: {
                    ...state.list.queryParams,
                    ...action.payload.queryParams,
                    pagination: {
                        ...state.list.queryParams.pagination,
                        ...action.payload.queryParams.pagination,
                    }
                },
            }
        }),
    [CLEAR_QUERY_PARAMS] : (state, action) =>
        ({
            ...state,
            list:{
                ...state.list,
                queryParams: initialState.list.queryParams,
            }
        }),
    [FETCH_LIST_REQUEST] : (state, action) =>
        ({
            ...state,
            listStatus : {
                type : FETCH_LIST_REQUEST,
                loading: true,
            },
        }),
    [FETCH_LIST_SUCCESS] : (state, action) =>
        ({
            ...state,
            listStatus : {
                type : FETCH_LIST_SUCCESS,
                loading: false,
            },
            list : {
                ...state.list,
                rows : action.payload.rows,
                queryParams:{
                    ...state.list.queryParams,
                    pagination: {
                        current : action.payload.current,
                        total : Number(action.payload.total),
                        pageSize: action.payload.pageSize
                    },
                }
            }
        }),
    [FETCH_LIST_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            listStatus : {
                type : FETCH_LIST_FAILURE,
                loading: false,
            },
        }),

    [FETCH_DETAIL_REQUEST] : (state, action) =>
        ({
            ...state,
            detailStatus : {
                type : FETCH_DETAIL_REQUEST,
                loading: true,
            },
        }),
    [FETCH_DETAIL_SUCCESS] : (state, action) =>
        ({
            ...state,
           detailStatus : {
                type : FETCH_DETAIL_SUCCESS,
                loading: false,
            },
            saveModalList : {
                productCode: action.payload.productCode,
                type: action.payload.type,
                name: action.payload.name,
                remark: action.payload.remark,
                startTime: action.payload.startTime,
                endTime: action.payload.endTime,
            },
        }),
    [FETCH_DETAIL_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            detailStatus : {
                type : FETCH_DETAIL_FAILURE,
                loading: false,
            },
        }),
    [FETCH_PRODUCT_REQUEST] : (state, action) =>
        ({
            ...state,
            productStatus : {
                type : FETCH_PRODUCT_REQUEST,
                loading: true,
            },
        }),
    [FETCH_PRODUCT_SUCCESS] : (state, action) =>
        ({
            ...state,
            productStatus : {
                type : FETCH_PRODUCT_SUCCESS,
                loading: false,
            },
            productList :  action.payload
        }),
    [FETCH_PRODUCT_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            productStatus : {
                type : FETCH_PRODUCT_FAILURE,
                loading: false,
            },
        }),
    [FETCH_FIRM_REQUEST] : (state, action) =>
        ({
            ...state,
            firmStatus : {
                type : FETCH_FIRM_REQUEST,
                loading: true,
            },
        }),
    [FETCH_FIRM_SUCCESS] : (state, action) =>
        ({
            ...state,
            firmStatus : {
                type : FETCH_FIRM_SUCCESS,
                loading: false,
            },
            firmList :  action.payload
        }),
    [FETCH_FIRM_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            firmStatus : {
                type : FETCH_FIRM_FAILURE,
                loading: false,
            },
        }),
    [FETCH_ENTERPRISE_REQUEST] : (state, action) =>
        ({
            ...state,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_REQUEST,
                loading: true,
            },
        }),
    [FETCH_ENTERPRISE_SUCCESS] : (state, action) =>
        ({
            ...state,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_SUCCESS,
                loading: false,
            },
            enterpriseList :  action.payload
        }),
    [FETCH_ENTERPRISE_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            enterpriseStatus : {
                type : FETCH_ENTERPRISE_FAILURE,
                loading: false,
            },
        }),
    [CREDIT_REQUEST] : (state, action) =>
        ({
            ...state,
            enterpriseCreditStatus : {
                type : CREDIT_REQUEST,
                loading: true,
            },
        }),
    [CREDIT_SUCCESS] : (state, action) =>
        ({
            ...state,
            enterpriseCreditStatus : {
                type : CREDIT_SUCCESS,
                loading: false,
            },
            enterpriseCreditList :  action.payload
        }),
    [CREDIT_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            enterpriseCreditStatus : {
                type : CREDIT_FAILURE,
                loading: false,
            },
        }),

    [FORBIDDEN_REQUEST] : (state, action) => 
    ({ 
      ...state, 
      forbiddenStatus:{
        type: FORBIDDEN_REQUEST,
        loading: true,
      }
    }),
  [FORBIDDEN_SUCCESS] : (state, action) => 
    ({ 
      ...state, 
      forbiddenStatus:{
        type: FORBIDDEN_SUCCESS,
        loading: false,
      }
    }),
  [FORBIDDEN_FAILURE] : (state, action) => 
    ({ 
      ...state, 
      err: action.payload,
      forbiddenStatus:{
        type: FORBIDDEN_FAILURE,
        loading: false,
      }
    }),
    [DETAIL_REQUEST] : (state, action) =>
        ({
            ...state,
            fetchDetailStatus:{
                type: DETAIL_REQUEST,
                loading: true,
            }
        }),
    [DETAIL_SUCCESS] : (state, action) =>
        ({
            ...state,
            fetchDetailStatus:{
                type: DETAIL_SUCCESS,
                loading: false,
            }
        }),
    [DETAIL_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            fetchDetailStatus:{
                type: DETAIL_FAILURE,
                loading: false,
            }
        }),
    [SAVE_REQUEST] : (state, action) =>
        ({
            ...state,
            saveStatus:{
                type: SAVE_REQUEST,
                loading: true,
            }
        }),
    [SAVE_SUCCESS] : (state, action) =>
        ({
            ...state,
            saveStatus:{
                type: SAVE_SUCCESS,
                loading: false,
            }
        }),
    [SAVE_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            saveStatus:{
                type: SAVE_FAILURE,
                loading: false,
            }
        }),

    [SAVE_CREDIT_REQUEST] : (state, action) =>
        ({
            ...state,
            saveCreditStatus:{
                type: SAVE_CREDIT_REQUEST,
                loading: true,
            }
        }),
    [SAVE_CREDIT_SUCCESS] : (state, action) =>
        ({
            ...state,
            saveCreditStatus:{
                type: SAVE_CREDIT_SUCCESS,
                loading: false,
            }
        }),
    [SAVE_CREDIT_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            saveCreditStatus:{
                type: SAVE_CREDIT_FAILURE,
                loading: false,
            }
        }),

    [UPDATE_REQUEST] : (state, action) =>
        ({
            ...state,
            updateStatus:{
                type: UPDATE_REQUEST,
                loading: true,
            }
        }),
    [UPDATE_SUCCESS] : (state, action) =>
        ({
            ...state,
            updateStatus:{
                type: UPDATE_SUCCESS,
                loading: false,
            }
        }),
    [UPDATE_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            updateStatus:{
                type: UPDATE_FAILURE,
                loading: false,
            }
        }),
    [DELETE_REQUEST] : (state, action) =>
        ({
            ...state,
            deleteStatus:{
                type: DELETE_REQUEST,
                loading: true,
            }
        }),
    [DELETE_SUCCESS] : (state, action) =>
        ({
            ...state,
            deleteStatus:{
                type: DELETE_SUCCESS,
                loading: false,
            }
        }),
    [DELETE_FAILURE] : (state, action) =>
        ({
            ...state,
            err: action.payload,
            deleteStatus:{
                type: DELETE_FAILURE,
                loading: false,
            }
        }),


    [UPDATE_FIELDS] : (state, action) =>
        ({
            ...state,
            fields: action.payload
        }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    err:'',
    deleteStatus:{
        type:DELETE_NOT,
        loading: false,
    },
    saveStatus:{
        type:SAVE_NOT,
        loading: false,
    },
    saveCreditStatus:{
        type:SAVE_CREDIT_NOT,
        loading: false,
    },
    updateStatus:{
        type:UPDATE_NOT,
        loading: false,
    },
    fetchDetailStatus:{
        type:DETAIL_NOT,
        loading: false,
    },
    listStatus:{
        type:FETCH_LIST_NOT,
        loading: false,
    },
    detailStatus:{
        type:FETCH_DETAIL_NOT,
        loading: false,
    },
    productStatus:{
        type:FETCH_PRODUCT_NOT,
        loading: false,
    },
    firmStatus:{
        type:FETCH_FIRM_NOT,
        loading: false,
    },
    forbiddenStatus:{
        type:FORBIDDEN_NOT,
        loading: false,
    },
    enterpriseStatus:{
        type:FETCH_ENTERPRISE_NOT,
        loading: false,
    },
    enterpriseCreditStatus:{
        type:CREDIT_NOT,
        loading: false,
    },
    fields:{
        id: null,//id,添加的时候为空，修改的时候有值

        productCode: {
            value: null
        },
        type:{
            value: null
        },
        code: {
            value: null
        },
        name: {
            value: null
        },
        remark: {
            value: null
        },
        startTime: {
            value: null
        },
        endTime: {
            value: null
        },
        ownerEnterpriseId:{
            value: null
        },
        creator: {
            value: null
        },
        state: {
            value: null
        },
        createTime: {
            value: null
        },
        modifiedBy: {
            value: null
        },
        modifiedTime: {
            value: null
        },
    },//表单数据
    list:{
        rows:[],
        queryParams:{
            pagination:{
                current:1,
                total:0,
                pageSize:10,
            },

        },
    },
    //企业信息
    firmList:[],
    //产品信息
    productList:[],
    //企业角色信息
    enterpriseList:[],
    //项目信息
    saveModalList:{
        productCode:null,
        name:null,
        remark:null,
        startTime:null,
        endTime:null,
    },
    //企业授信
    enterpriseCreditList:[],
}

export default function reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
