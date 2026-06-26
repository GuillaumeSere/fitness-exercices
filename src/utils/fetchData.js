export const EXERCISE_DB_BASE_URL = 'https://exercisedb.p.rapidapi.com';
export const EXERCISE_DB_LIST_LIMIT = '0';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_API_KEY,
  },
};

export const getExerciseDbUrl = (path, query = {}) => {
  const url = new URL(`${EXERCISE_DB_BASE_URL}${path}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

export const getExerciseListUrl = (path, query = {}) => (
  getExerciseDbUrl(path, { limit: EXERCISE_DB_LIST_LIMIT, ...query })
);

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;

    try {
      const errorData = await res.json();
      message = errorData?.message || errorData?.error || message;
    } catch (error) {
      message = res.statusText || message;
    }

    throw new Error(message);
  }

  return res.json();
};
