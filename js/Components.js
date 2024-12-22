import {
  addCommasToNumber,
  formatMinutesToHours,
  formatSeasonAndEpisodes,
} from './Helper.js';

export const createCard = (item, type) => {
  const card = document.createElement('div');

  card.classList.add('card');

  // Determine the base path for the link
  const basePath = type === 'movie' ? 'movie-details.html' : 'tv-details.html';

  card.innerHTML = `<a href="/pages/${basePath}?id=${item.id}">
  ${
    item.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${
          item.poster_path
        }" class="card-img-top" alt="${item.title || item.name}" />`
      : `<img src="../images/no-image-showverse.jpg" class="card-img-top" alt="${item.title}" />`
  }
</a>
<div class="card-body">
  <h5 class="card-title">${item.title || item.name}</h5>
  <p class="card-text">
    <small class="text-muted">Release: ${
      item.release_date || item.first_air_date
    }</small>
  </p>
</div>`;
  return card;
};

export const createSlider = (item, type) => {
  const slider = document.createElement('div');
  slider.classList.add('swiper-slide');

  const basePath = type === 'movie' ? 'movie-details.html' : 'tv-details.html';

  slider.innerHTML = `<a href=/pages/${basePath}?id=${item.id}>
    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}"/>
  </a>`;
  return slider;
};

export const createDetailsContent = (item, type) => {
  const detailsContent = document.createElement('div');
  detailsContent.innerHTML = `
    <div class="details-top">
      <div>
        ${
          item.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${
                item.poster_path
              }" class="card-img-top" alt="${item.title || item.name}" />`
            : `<img src="../images/no-image-showverse.jpg" class="card-img-top" alt="${
                item.title || item.name
              }" />`
        }
      </div>
      <div>
        <h2>${item.title || item.name}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${item.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">${
          type === 'movie' ? 'Release Date' : 'Last Air Date'
        }: ${item.release_date || item.last_air_date}</p>
        <p>${item.overview}</p>
        <h5>Genres</h5>
        <ul class="list-group">
          ${item.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${item.homepage}" target="_blank" class="btn">Visit ${
    type === 'movie' ? 'Movie' : 'Show'
  } Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>${item.title || item.name}</h2>
      <ul>
        ${
          type === 'movie'
            ? `
              ${
                item.budget
                  ? `<li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
                      item.budget
                    )}</li>`
                  : ''
              }
              ${
                item.revenue
                  ? `<li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
                      item.revenue
                    )}</li>`
                  : ''
              }
              <li><span class="text-secondary">Runtime:</span> ${formatMinutesToHours(
                item.runtime
              )}</li>
            `
            : `
              <li><span class="text-secondary">Number of Seasons and Episodes:</span> ${formatSeasonAndEpisodes(
                item.number_of_seasons,
                addCommasToNumber(item.number_of_episodes)
              )}</li>
              <li><span class="text-secondary">Last Episode To Air:</span> ${
                item.last_episode_to_air.episode_number
              } - ${item.last_episode_to_air.name}</li>
            `
        }
        <li><span class="text-secondary">Status:</span> ${item.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
        ${item.production_companies
          .map((company) => `<span>${company.name}</span>`)
          .join(', ')}
      </div>
    </div>
  `;
  return detailsContent;
};
