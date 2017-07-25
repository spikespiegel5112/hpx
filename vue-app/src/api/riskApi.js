import fetch from '@/config/fetch'

export const labelList = (eid,params) => fetch(`/credit/scorelabel/${eid}`,params);