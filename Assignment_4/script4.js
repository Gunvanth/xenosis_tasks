document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const searchContainer = document.querySelector('.search-container');

    searchButton.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchBar.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove('active');
        }
    });
});
