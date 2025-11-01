// search products for keywords
export function searchProduct() {
  const searchBar = document.querySelector('.js-search-bar');
  const searchButton = document.querySelector('.js-search-button');

  searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      window.location.href = `./?search=${searchBar.value}`;
    }
  });
  searchButton.addEventListener('click', () => {
    window.location.href = `./?search=${searchBar.value}`;
  });

  return searchBar.value;
}