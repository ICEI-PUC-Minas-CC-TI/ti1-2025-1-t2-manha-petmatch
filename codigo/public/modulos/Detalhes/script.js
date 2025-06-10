import { PetInterface } from '../../db-interface/pet-interface.js';

const gerenciamentopets = new PetInterface();

document.addEventListener('DOMContentLoaded', async () => {
  // A url q deve ficar no meu parametro
  const params = new URLSearchParams(window.location.search);
  if (!params.has('petId')) {
    params.set('petId', '52cbc36c-bd71-420e-a1f9-f284c9cc9673');
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newUrl);
  }

  const contactButton = document.getElementById('contactButton');
  const adoptButton = document.getElementById('adoptButton');
  const favoriteIcon = document.getElementById('favoriteIcon');

  const petNameElement = document.getElementById('petName');
  const petDescriptionElement = document.getElementById('petDescription');
  const petSpeciesElement = document.getElementById('petSpecies');
  const petBreedElement = document.getElementById('petBreed');
  const petGenderElement = document.getElementById('petGender');
  const petAgeElement = document.getElementById('petAge');
  const petVaccinatedElement = document.getElementById('petVaccinated');
  const petImageElement = document.getElementById('petImage');

  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const petListContainer = document.getElementById('petListContainer');

  const currentPetId = params.get('petId');
  const currentUserId = 'current-user-id-abc'; // eu fui arrumar pra por sua url mas agr nem aparece mais a opcao

  let loadedPetName = 'este PET';

  if (currentPetId) {

    const result = await gerenciamentopets.getPetById(currentPetId);

    if (result.success && result.pet) {
      const pet = result.pet;
      loadedPetName = pet.name || loadedPetName;

      if (petNameElement) petNameElement.textContent = pet.name || 'Nome indisponível';
      if (petDescriptionElement) petDescriptionElement.textContent = pet.description || 'Descrição indisponível';
      if (petSpeciesElement) petSpeciesElement.textContent = pet.species || '-';
      if (petBreedElement) petBreedElement.textContent = pet.breed || '-';
      if (petGenderElement) petGenderElement.textContent = pet.gender || '-';
      if (petAgeElement) petAgeElement.textContent = pet.age || '-';
      if (petVaccinatedElement) petVaccinatedElement.textContent = pet.vaccinated ? 'Sim' : 'Não';

      if (petImageElement && pet.imageUrl) petImageElement.src = pet.imageUrl;
    } else {
      console.error('Erro ao carregar detalhes do PET:', result.error);
      alert('Não foi possível carregar os detalhes do PET. Tente novamente mais tarde.');
    }
  } else {
    console.warn('ID do PET não encontrado na URL.');
  }

  if (contactButton) {
    contactButton.addEventListener('click', async () => {
      if (!currentPetId) {
        alert('Não foi possível contatar. ID do PET não disponível.');
        return;
      }
      const result = await gerenciamentopets.getDonorContactInfo(currentPetId);
      if (result.success && result.donor) {
        const donor = result.donor;
        alert(`Informações de contato de ${donor.name}:\nTelefone: ${donor.phone || 'Não informado'}\nEmail: ${
          donor.email || 'Não informado'
        }`);
      } else {
        alert(`Não foi possível obter informações de contato do doador para ${loadedPetName}.`);
        console.error('Erro ao obter informações do doador:', result.error);
      }
    });
  }

  if (adoptButton) {
    adoptButton.addEventListener('click', (event) => {
      if (event.target === favoriteIcon || favoriteIcon.contains(event.target)) {
        return;
      }
      alert(`Você demonstrou interesse em adotar o ${loadedPetName}! Um formulário de adoção ou próximos passos seriam exibidos aqui.`);
    });
  }

  if (favoriteIcon) {
    favoriteIcon.addEventListener('click', async (event) => {
      event.stopPropagation();

      if (!currentUserId || !currentPetId) {
        alert('Para favoritar, você precisa estar logado e ter um PET selecionado.');
        console.error('ID do usuário ou do PET ausente para a ação de favoritar.');
        return;
      }

      const isCurrentlyFavorited = favoriteIcon.classList.contains('favorited');
      let result;

      if (isCurrentlyFavorited) {
        result = await gerenciamentopets.unfavoritePet(currentUserId, currentPetId);
        if (result.success) {
          favoriteIcon.classList.remove('favorited');
        } else {
          alert(`Erro ao remover ${loadedPetName} dos favoritos: ${result.error}`);
          console.error('Erro ao desfavoritar:', result.error);
        }
      } else {
        result = await gerenciamentopets.favoritePet(currentUserId, currentPetId);
        if (result.success) {
          favoriteIcon.classList.add('favorited');
        } else {
          alert(`Erro ao adicionar ${loadedPetName} aos favoritos: ${result.error}`);
          console.error('Erro ao favoritar:', result.error);
        }
      }
    });
  }

  if (searchButton && searchInput && petListContainer) {
    searchButton.addEventListener('click', async () => {
      const searchTerm = searchInput.value.trim();
      const petsResult = await gerenciamentopets.fetchPets(searchTerm);

      petListContainer.innerHTML = ''; // limpa

      if (petsResult.success && Array.isArray(petsResult.pets) && petsResult.pets.length > 0) {
        petsResult.pets.forEach((pet) => {
          const petCard = createPetCard(pet);
          petListContainer.appendChild(petCard);
        });
      } else {
        petListContainer.innerHTML = '<p>Nenhum pet encontrado para a pesquisa.</p>';
      }
    });
  }
});

function createPetCard(pet) {
  const card = document.createElement('article');
  card.classList.add('pet-card');

  const img = document.createElement('img');
  img.src = pet.imageUrl || 'https://via.placeholder.com/150';
  img.alt = pet.name ? `Foto do pet ${pet.name}` : 'Foto do pet';

  const name = document.createElement('h3');
  name.textContent = pet.name || 'Pet sem nome';

  const species = document.createElement('p');
  species.textContent = pet.species || 'Espécie desconhecida';

  const breed = document.createElement('p');
  breed.textContent = pet.breed || 'Raça desconhecida';

  const detailsButton = document.createElement('a');
  detailsButton.textContent = 'Ver Detalhes';
  detailsButton.classList.add('details-button');
  detailsButton.href = `detalhes.html?petId=${encodeURIComponent(pet.id)}`;

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(species);
  card.appendChild(breed);
  card.appendChild(detailsButton);

  return card;
}
