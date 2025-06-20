document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');
    const backButton = document.querySelector('.back-button');
    const searchInput = document.querySelector('.header .search-bar input');
    const searchButton = document.querySelector('.header .search-bar button');

    function fetchPetDetails(id) {
        fetch('pets.json')
            .then(response => response.json())
            .then(pets => {
                const pet = pets.find(pet => pet.id === id);
                if (pet) {
                    document.getElementById('pet-image').src = pet.img_url;
                    document.getElementById('pet-name').textContent = pet.name;
                    document.getElementById('pet-breed').textContent = `${pet.animal_type} - ${pet.animal_sex}`;
                    document.getElementById('pet-age').textContent = pet.age;
                    document.getElementById('pet-description').textContent = pet.description;
                } else {
                    document.querySelector('.pet-details-section').innerHTML = '<p>Pet não encontrado.</p>';
                }
            })
            .catch(error => console.error('Erro ao carregar detalhes do pet:', error));
    }

    backButton.addEventListener('click', () => {
        window.history.back();
    });

    fetchPetDetails(petId);

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        window.location.href = `index.html?search=${searchTerm}`;
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
         window.location.href = `index.html?search=${searchTerm}`;
    });
});