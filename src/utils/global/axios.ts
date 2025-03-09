import Axios from 'axios';

import appConfig from '@/constants/global/config';

const axios = Axios.create({
  baseURL: appConfig.tmdb.v3api,
  headers: {
    ['Authorization']: `Bearer ${appConfig.tmdb.apiToken}`,
  },
});

export default axios;
