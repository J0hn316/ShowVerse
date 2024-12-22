import { API_KEY } from './config.js';

const API_URL = 'https://api.themoviedb.org/3/';

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// Fetch data from TMDB API
export const fetchAPIData = async (endpoint, params = {}) => {
  showSpinner();

  try {
    // Build query string from params
    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      ...params, // Merge additional parameters
    });

    const res = await fetch(`${API_URL}${endpoint}?${queryParams}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse JSON response
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    hideSpinner();
  }
};

export const searchApiData = async (searchType, searchTerm, pageNumber = 1) => {
  showSpinner();

  try {
    const res = await fetch(
      `${API_URL}search/${searchType}?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${pageNumber}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    hideSpinner();
  }
};
