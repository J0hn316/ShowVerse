import { showAlert } from './Helper.js';
import { searchApiData } from './Api.js';
import { createCard } from './Components.js';

const global = {
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
};

const displayPagination = () => {
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector('#pagination').appendChild(pagination);

  // Disable prev button if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable next button if on last page
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next Page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchApiData(
      global.search.type,
      global.search.term,
      global.search.page
    );
    displaySearchResults(results, global.search.type);
  });
  // Prev Page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchApiData(
      global.search.type,
      global.search.term,
      global.search.page
    );
    displaySearchResults(results, global.search.type);
  });
};

const displaySearchResults = (results, type) => {
  const container = document.querySelector('#search-results');
  container.innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  document.querySelector(
    '#search-results-heading'
  ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for "${global.search.term}"</h2>`;

  results.forEach((result) => {
    const card = createCard(result, type);
    container.appendChild(card);
  });

  displayPagination();
};

// Search Movies/Shows
export const search = async () => {
  const queryStr = window.location.search;
  const urlParams = new URLSearchParams(queryStr);

  global.search.type = urlParams.get('type') || '';
  global.search.term = urlParams.get('search-term') || '';

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchApiData(
      global.search.type,
      global.search.term
    );

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }
    displaySearchResults(results, global.search.type);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
};
