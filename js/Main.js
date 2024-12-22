import { search } from './Search.js';
import { highlightActiveLink } from './Helper.js';
import { initShowsPage, initTvDetailsPage } from './TvShows.js';
import { initMoviesPage, initMovieDetailsPage } from './Movies.js';

const global = {
  currentPage: window.location.pathname,
};

// Init App
const App = () => {
  const routes = {
    '/': initMoviesPage,
    '/index.html': initMoviesPage,
    '/pages/shows.html': initShowsPage,
    '/pages/movie-details.html': initMovieDetailsPage,
    '/pages/tv-details.html': initTvDetailsPage,
    '/pages/search.html': search,
  };

  if (routes[global.currentPage]) {
    routes[global.currentPage]();
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', App);
