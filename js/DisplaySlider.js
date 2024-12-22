import { fetchAPIData } from './Api.js';
import { createSlider } from './Components.js';

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

export const displayTvSlider = async () => {
  const { results } = await fetchAPIData('discover/tv', {
    sort_by: 'vote_count.desc',
    with_genres: '16,10759,10765',
  });

  const container = document.querySelector('.swiper-wrapper');
  results.forEach((show) => container.appendChild(createSlider(show, 'show')));

  initSwiper();
};

export const displayMovieSlider = async (type, option) => {
  const { results } = await fetchAPIData(`${type}/${option}`);
  const container = document.querySelector('.swiper-wrapper');
  results.forEach((movie) =>
    container.appendChild(createSlider(movie, 'movie'))
  );

  initSwiper();
};
