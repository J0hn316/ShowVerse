import { fetchAPIData } from './Api.js';
import { displayMovieSlider } from './DisplaySlider.js';
import { getBackgroundImg } from './GetBackgroundImg.js';
import { createCard, createDetailsContent } from './Components.js';

const getMovies = async () => {
  const { results } = await fetchAPIData('discover/movie', {
    sort_by: 'popularity.desc',
    with_genres: '12,14,16,28',
  });

  const container = document.querySelector('#popular-movies');
  results.forEach((movie) => container.appendChild(createCard(movie, 'movie')));
};

const getMovieInfo = async () => {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  getBackgroundImg('movie', movie.backdrop_path);

  const content = createDetailsContent(movie, 'movie');
  document.querySelector('#movie-details').appendChild(content);
};

export const initMoviesPage = () => {
  displayMovieSlider('movie', 'now_playing');
  getMovies();
};

export const initMovieDetailsPage = () => {
  getMovieInfo();
};
