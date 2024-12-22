import { fetchAPIData } from './Api.js';
import { displayTvSlider } from './DisplaySlider.js';
import { getBackgroundImg } from './GetBackgroundImg.js';
import { createCard, createDetailsContent } from './Components.js';

const getTvShows = async () => {
  const { results } = await fetchAPIData('discover/tv', {
    sort_by: 'popularity.desc',
    with_genres: '16,10759,10765',
  });

  const container = document.querySelector('#popular-shows');
  results.forEach((show) => container.appendChild(createCard(show, 'tv')));
};

const getTvShowsInfo = async () => {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showId}`);

  getBackgroundImg('tv', show.backdrop_path);
  const content = createDetailsContent(show, 'tv');
  document.querySelector('#show-details').appendChild(content);
};

export const initShowsPage = () => {
  displayTvSlider();
  getTvShows();
};

export const initTvDetailsPage = () => {
  getTvShowsInfo();
};
