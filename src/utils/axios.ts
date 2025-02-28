import Axios from 'axios';

import appConfig from '@/constants/config';

const axios = Axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    ['Authorization']: `Bearer ${appConfig.tmdb.apiToken}`,
  },
});

export default axios;
