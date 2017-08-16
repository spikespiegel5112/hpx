import fetch from '@/config/fetch'

export const accountsList = (params) => fetch(`/core/core/api/v1/enterprise/accounts`,params);
