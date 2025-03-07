import appConfig from '@/constants/config';

const tmdbApiUrl = 'https://api.themoviedb.org/3';

const serverFetch = async <T>(url: string, options: RequestInit = {}) => {
  const headers = {
    Authorization: `Bearer ${appConfig.tmdb.apiToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };
  try {
    const response = await fetch(`${tmdbApiUrl}${url}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default serverFetch;
