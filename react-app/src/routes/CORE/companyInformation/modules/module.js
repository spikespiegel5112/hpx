import fetch, { formPostReq , postReq, getReq, deleteReq, putReq, patchReq }  from '../../../../core/fetch';
import moment from 'moment'
import { message } from 'antd'
// ------------------------------------
// Constants
// ------------------------------------
const ACTION_PREFIX = 'comInfo::';

const IS_AUTH_EDITE = ACTION_PREFIX + 'IS_EDITE';
const FETCH_COMINFO_SUCCESS = ACTION_PREFIX+'FETCH_COMINFO_SUCCESS';
const UPDATE_COMINFO_BASE = ACTION_PREFIX + 'UPDATE_COMINFO_BASE';
const UPDATE_COMINFO_BUSINESS = ACTION_PREFIX + 'UPDATE_COMINFO_BUSINESS';
const UPDATE_COMINFO_CONTRACTS = ACTION_PREFIX + 'UPDATE_COMINFO_CONTRACTS';
const UPDATE_COMINFO_TAX = ACTION_PREFIX + 'UPDATE_COMINFO_TAX';
const CLEAR_FORM_PROPS = ACTION_PREFIX + 'CLEAR_FORM_PROPS';
// ------------------------------------
// Actions
// ------------------------------------

//
let baseInfo = {
  name: {
    value:null
  },
  iscode31 : {
    value : null
  },
  licenceNo : {
    value : null
  },
  codeOrg : {
    value : null
  },
  taxNumber : {
    value : null
  },
  enterpriseType : {
    value : null
  },
  industry : {
    value : null
  },
  area : {
    value : null
  }
}
let businessInfo = {
  regDate : {
    value : null
  },
  regOffice : {
    value : null
  },
  regCurrency :{
    value : null
  },
  regCapital :{
    value : null
  },
  operationTerm :{
    value : null
  },
  inspectionTime :{
    value : null
  },
  personNum :{
    value : null
  },
  normalInspection :{
    value : null
  },
  contactsEmail :{
    value : null
  },
  taxRegistrationInfo :{
    value : null
  },
  address : {
    value : null,
  }
}
let contactsInfo = {
  contacts :{
    value : null
  },
  contactsPhone :{
    value : null
  },
  contactsEmail :{
    value : null
  },
  city :{
    value : null
  },
  address :{
    value : null
  },
  contactsPost :{
    value : null
  },
  legalPerson :{
    value : null
  },
  legalCardNo :{
    value : null
  },
  scopeOfBusiness :{
    value : null
  },
}

let taxRegistrationInfo = {
  taxType :{
    value : null
  },
  taxNumber :{
    value : null
  }
}

// ------------------------------------
// Action Handlers
// -----------------------------------

const formatData = (keyObj,valuesObj,endObj={})=>{
  for(let key of Object.keys(keyObj)){
        endObj[key] = {
          value :  valuesObj[key]
        };
    };
    return endObj;
}

export const fetchComInfo = ()=>{
  return async (dispatch,getState)=>{
    const enterprisesId = getState().login.userInfo.enterpriseId;
    const resp = await getReq('/core/core/api/v1/enterprises/'+enterprisesId)
    const res = await resp.json();
    const baseInfoR = formatData(baseInfo,res);
    const businessInfoR = formatData(businessInfo,res);
    const contactsInfoR = formatData(contactsInfo,res);
    const taxRegistrationInfoR = formatData(taxRegistrationInfo,res);
    dispatch({
        type : FETCH_COMINFO_SUCCESS,
        payload :{
          baseInfoR,
          businessInfoR,
          contactsInfoR,
          taxRegistrationInfoR,
        } 
    });
  }
}

export const updateComInfo = (fields,type)=>{
    return async(dispatch, getState) => {
      const obj = {}
      for (let [key,value] of Object.entries(fields)){
          Object.assign(obj,{
            [key] : {
              value : value
            }
          })
      };
      let dataType = null;
      switch(type){
        case 0 : 
        dataType = UPDATE_COMINFO_BASE;
        break;
        case 1 : 
        dataType = UPDATE_COMINFO_BUSINESS;
        break;
        case 2 : 
        dataType = UPDATE_COMINFO_CONTRACTS;
        break;
        case 3 : 
        dataType = UPDATE_COMINFO_TAX;
        break;
      }
      try{
        let enterpriseId = getState().login.userInfo.enterpriseId;
        const resp = await patchReq('/core/core/api/v1/enterprises/'+enterpriseId,fields)
        if(resp.ok){
            dispatch({
              type: dataType,
              payload: obj
            });       
        }
        return true
      }catch(e){
        message.error(e);
        return false
      }
      
    }
}

export const deleteState = ()=>{
  return (dispatch,getState)=>{
      const storeState = getState();
      delete storeState.companayInfoModule;
  }
}

export const actions = {
  fetchComInfo,
  updateComInfo,
  deleteState
}

const ACTION_HANDLERS = {
    [CLEAR_FORM_PROPS] :(state,action)=>({
        ...state,
        comInfo:{
          ...state.comInfo,
          baseInfo:null,
          businessInfo :null,
          contactsInfo:null,
          taxRegistrationInfo:null
        } 
    }),
    [IS_AUTH_EDITE] : (state,action)=>({
        ...state,
        isEdite : action.payload
    }),
    [FETCH_COMINFO_SUCCESS] : (state,action)=>({

        ...state,
        comInfo :{
          ...state.comInfo,
          baseInfo: action.payload.baseInfoR,
          businessInfo : action.payload.businessInfoR,
          contactsInfo : action.payload.contactsInfoR,
          taxRegistrationInfo : action.payload.taxRegistrationInfoR,
        } 
    }),
    [UPDATE_COMINFO_BASE] : (state,action)=>({
      ...state,
      comInfo:{
        ...state.comInfo,
        baseInfo:action.payload
      }
    }),
    [UPDATE_COMINFO_BUSINESS] : (state,action)=>({
      ...state,
      comInfo:{
        ...state.comInfo,
        businessInfo:action.payload
      }
    }),
    [UPDATE_COMINFO_CONTRACTS] : (state,action)=>({
      ...state,
      comInfo:{
        ...state.comInfo,
        contactsInfo:action.payload
      }
    }),
    [UPDATE_COMINFO_TAX] : (state,action)=>({
      ...state,
      comInfo:{
        ...state.comInfo,
        taxRegistrationInfo:action.payload
      }
    })
}
// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  isAuthEdite : true,
  comInfo : {
    infoStatus : false,
    baseInfo : baseInfo,
    businessInfo : businessInfo,
    contactsInfo : contactsInfo,
    taxRegistrationInfo:taxRegistrationInfo
  },
  upload : [

  ]
}

export default function reducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
