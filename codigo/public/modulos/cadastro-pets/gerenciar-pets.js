import { PetInterface } from '../../db-interface/pet-interface.js';
import { AnimalTypeInterface } from '../../db-interface/animal-type-interface.js';

const petService = new PetInterface();
const animalTypeService = new AnimalTypeInterface();

const petsListContainer = document.getElementById('pets-list-container');
const loadingMessage = document.getElementById('loading-message');
const noPetsMessage = document.getElementById('no-pets-message');

function showFeedbackMessage(message, type) {
  let feedbackDiv = document.querySelector('.feedback-message');
  if (!feedbackDiv) {
    feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback-message');
    document.querySelector('.content-section').prepend(feedbackDiv);
  }

  feedbackDiv.textContent = message;
  feedbackDiv.className = 'feedback-message';
  feedbackDiv.classList.add(type, 'show');

  setTimeout(() => {
    feedbackDiv.classList.remove('show');
  }, 3000);
}

async function renderPets() {
  loadingMessage.style.display = 'block';
  noPetsMessage.style.display = 'none';
  petsListContainer.innerHTML = '';

  try {
    const response = await petService.fetchPets();
    let pets = [];

    if (response && response.isLeft && response.isLeft()) {
      console.error("Erro ao buscar pets:", response.value);
      showFeedbackMessage('Erro ao carregar pets: ' + response.value.message || 'Erro desconhecido.', 'error');
      loadingMessage.style.display = 'none';
      noPetsMessage.style.display = 'block';
      return;
    } else {
      pets = response.pets || [];
    }

    loadingMessage.style.display = 'none';

    if (pets.length === 0) {
      noPetsMessage.style.display = 'block';
      return;
    }

    const animalTypesResponse = await animalTypeService.fetchAnimalType();
    const animalTypesMap = {};
    if (animalTypesResponse && animalTypesResponse.animaltypes) {
      animalTypesResponse.animaltypes.forEach(type => {
        const id = type?.id || type?._id || type?.props?.id;
        const name = type?.type || type?.props?.type;
        if (id && name) {
          animalTypesMap[id] = name;
        }
      });
    }

    pets.forEach(pet => {
      const petId = pet.id || pet._id || pet.props.id;
      const petName = pet.name || pet.props.name;
      const petDescription = pet.descriptions || pet.props.descriptions;
      const petImage = (pet.imgUrls && pet.imgUrls.length > 0) ? pet.imgUrls[0] : null;
      const petClassificationId = pet.animalTypeId || pet.props.animalTypeId;
      const petClassificationName = animalTypesMap[petClassificationId] || 'Desconhecido';
      const petBreed = (pet.breed && pet.breed.length > 0) ? pet.breed.join(', ') : 'Não informada';
      const petVacinado = pet.vaccinated || pet.props.vaccinated;
      const petVacinas = (pet.vaccines && pet.vaccines.length > 0) ? pet.vaccines.join(', ') : 'Nenhuma';
      const petTamanho = pet.size || pet.props.size;
      const petCastrado = pet.castrated || pet.props.castrated;
      const petCidade = pet.address?.city || pet.props?.address?.city || 'Não informada';
      const petEstado = pet.address?.state || pet.props?.address?.state || 'Não informado';
      const petDonorId = pet.donorId || pet.props.donorId || 'some-predefined-donor-id';

      if (!petId) {
        console.warn("Pet sem ID encontrado, ignorando:", pet);
        return;
      }

      const petCard = document.createElement('div');
      petCard.classList.add('pet-card');
      petCard.dataset.id = petId;
      petCard.dataset.donorId = petDonorId;

      petCard.innerHTML = `
                <div class="pet-card-image">
                    ${petImage ? `<img src="${petImage}" alt="Foto de ${petName}">` : '<i class="material-icons">pets</i>'}
                </div>
                <div class="pet-card-info">
                    <h3>${petName}</h3>
                    <p><strong>Espécie:</strong> ${petClassificationName}</p>
                    <p><strong>Raça:</strong> ${petBreed}</p>
                    <p><strong>Vacinado:</strong> ${petVacinado ? 'Sim' : 'Não'}</p>
                    ${petVacinado && petVacinas ? `<p><strong>Vacinas:</strong> ${petVacinas}</p>` : ''}
                    <p><strong>Tamanho:</strong> ${petTamanho || 'Não informado'}</p>
                    <p><strong>Castrado:</strong> ${petCastrado ? 'Sim' : 'Não'}</p>
                    <p><strong>Endereço:</strong> ${petCidade}, ${petEstado}</p>
                    <p>${petDescription || 'Sem descrição.'}</p>
                </div>
                <div class="pet-card-actions">
                    <button class="delete-pet-btn">Apagar Pet</button>
                </div>
            `;
      petsListContainer.appendChild(petCard);
    });

    document.querySelectorAll('.delete-pet-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const petCard = event.target.closest('.pet-card');
        const petId = petCard.dataset.id;
        const donorId = petCard.dataset.donorId;
        confirmDeletePet(petId, donorId);
      });
    });

  } catch (error) {
    console.error("Erro inesperado ao renderizar pets:", error);
    showFeedbackMessage('Erro inesperado ao carregar pets.', 'error');
    loadingMessage.style.display = 'none';
    noPetsMessage.style.display = 'block';
  }
}

async function confirmDeletePet(petId, donorId) {
  const isConfirmed = confirm('Tem certeza que deseja apagar este pet? Esta ação é irreversível.');
  if (isConfirmed) {
    await deletePet(petId, donorId);
  }
}

async function deletePet(petId, donorId) {
  if (!petId || !donorId) {
    showFeedbackMessage('Erro: ID do pet ou ID do doador ausente.', 'error');
    return;
  }

  try {
    const response = await petService.deletePet({ petId, donorId });

    if (response && response.isLeft && response.isLeft()) {
      console.error("Erro ao apagar pet:", response.value);
      showFeedbackMessage('Erro ao apagar pet: ' + response.value.message || 'Erro desconhecido.', 'error');
    } else {
      showFeedbackMessage('Pet apagado com sucesso!', 'success');
      renderPets();
    }
  } catch (error) {
    console.error("Erro inesperado ao apagar pet:", error);
    showFeedbackMessage('Ocorreu um erro ao apagar o pet. Verifique o console.', 'error');
  }
}

document.addEventListener('DOMContentLoaded', renderPets);