export const addCommasToNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatMinutesToHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  }
  return `${hours} hours and ${remainingMinutes} minutes`;
};

export const formatSeasonAndEpisodes = (season, episodes) => {
  return `${season} Seasons - ${episodes} Episodes`;
};

export const showAlert = (message, className = 'error') => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
};

// Highlight Active Link
export const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');

  const currentPage = window.location.pathname;
  links.forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
};
