// Basic Search Functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Você pesquisou por: "${query}"\nA funcionalidade de busca real não está implementada neste demo.`);
            console.log("Pesquisando por:", query);
            // Here you would typically redirect to a search results page or filter content
        } else {
            alert('Por favor, digite algo para pesquisar.');
        }
    };

    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
});