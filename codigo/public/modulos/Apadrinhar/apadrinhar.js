$(document).ready(function() {
  const petsParaApadrinhar = [
    { id: 1, name: 'SCOOBY', image: 'https://placedog.net/400/300?id=1', species: 'Cachorro', gender: 'Macho', age: '2 meses', description: 'SCOOBY é brincalhão e adora correr atrás da bolinha.' },
    { id: 2, name: 'BENTO', image: 'https://placedog.net/400/300?id=2', species: 'Cachorro', gender: 'Macho', age: '3 meses', description: 'Muito carinhoso e se dá bem com crianças.' },
    { id: 3, name: 'MEL', image: 'https://placedog.net/400/300?id=3', species: 'Cachorro', gender: 'Fêmea', age: '2 meses', description: 'MEL é tranquila e ótima companheira.' },
    { id: 4, name: 'LUNA', image: 'https://placedog.net/400/300?id=4', species: 'Gato', gender: 'Fêmea', age: '5 meses', description: 'Gatinha esperta e carinhosa, adora brincar com bolinhas de papel.' },
    { id: 5, name: 'TIGRÃO', image: 'https://placedog.net/400/300?id=5', species: 'Cachorro', gender: 'Macho', age: '3 meses', description: 'Cheio de energia e sempre atento a tudo ao redor.' },
    { id: 6, name: 'MAX', image: 'https://placedog.net/400/300?id=6', species: 'Cachorro', gender: 'Macho', age: '1 ano', description: 'Companheiro leal e adora passeios no parque.' }
  ];

  const $petCardListContainer = $('#pet-card-list-container');
  const $searchBar = $('#searchBar');
  const $searchButton = $('#searchButton');

  function renderPetCards(pets) {
    $petCardListContainer.empty();
    if (!pets || pets.length === 0) {
      $petCardListContainer.html('<p style="text-align:center; width:100%; padding: 20px; color: #777;">Nenhum pet encontrado para apadrinhar no momento.</p>');
      return;
    }

    pets.forEach(pet => {
      const cardHtml = `
        <div class="pet-card">
          <img src="${pet.image}" alt="${pet.name}">
          <div class="pet-info">
            <h2>${pet.name} <span class="pet-age">${pet.age}</span></h2>
            <p class="pet-breed">${pet.species} - ${pet.gender}</p>
            <p class="pet-description">${pet.description}</p>
          </div>
          <button class="btn-apadrinhar" data-petid="${pet.id}" data-petname="${encodeURIComponent(pet.name)}">Apadrinhar pet</button>
        </div>
      `;
      $petCardListContainer.append(cardHtml);
    });

    $('.btn-apadrinhar').on('click', function() {
      const petId = $(this).data('petid');
      const petName = $(this).data('petname');
      window.location.href = `como-apadrinhar.html?petId=${petId}&petName=${petName}`;
    });
  }

  function filterPets() {
    const searchTerm = $searchBar.val().toLowerCase();
    const filteredPets = petsParaApadrinhar.filter(pet =>
      pet.name.toLowerCase().includes(searchTerm) ||
      pet.species.toLowerCase().includes(searchTerm) ||
      pet.gender.toLowerCase().includes(searchTerm)
    );
    renderPetCards(filteredPets);
  }

  $searchButton.on('click', filterPets);
  $searchBar.on('keyup', function(e) {
    if (e.key === 'Enter' || this.value === '') {
      filterPets();
    }
  });

  $('#btn-perfil').on('click', function() {
    alert('Redirecionando para a página de Perfil...');
  });

  $('#btn-sair').on('click', function() {
    alert('Simulando logout...');
  });

  renderPetCards(petsParaApadrinhar);
});
