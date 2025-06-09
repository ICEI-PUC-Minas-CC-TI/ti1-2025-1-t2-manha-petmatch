import { JsonRatingUserRepository } from "../../src/database/repositories/adoption/json-rating-user-repository.js";
import { RatingUserUseCase } from "../../src/domain/adoption/application/use-cases/rating-user.js";
import { JsonUserRepository } from "../../src/database/repositories/adoption/json-user-repository.js";
import { JsonDonorRepository } from "../../src/database/repositories/adoption/json-donor-repository.js";

// Captura do ratedId da URL (ex: avaliar.html?ratedId=abcd1234)
const urlParams = new URLSearchParams(window.location.search);
const ratedId = urlParams.get("ratedId"); // O ID do perfil que está sendo avaliado

if (!ratedId) {
  alert("Erro: Nenhum usuário foi definido para avaliação. Por favor, forneça um 'ratedId' na URL.");
  // Redirecionar ou desabilitar o formulário se ratedId for nulo
  window.location.href = '/'; // Exemplo: volta para a página inicial
}

const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
const commentInput = document.getElementById('comment');
const submitBtn = document.getElementById('submitBtn');
const commentDisplay = document.getElementById('submitted-comment');

let currentRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const value = +star.getAttribute('data-value');
    highlightStars(value);
  });
  
  star.addEventListener('mouseout', () => {
    highlightStars(currentRating);
  });
  
  star.addEventListener('click', () => {
    currentRating = +star.getAttribute('data-value');
    ratingValue.textContent = `Nota: ${currentRating}/5`;
    highlightStars(currentRating);
  });
});

function highlightStars(value) {
  stars.forEach(star => {
    const starValue = +star.getAttribute('data-value');
    if (starValue <= value) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Instancia os repositórios
const userRepository = new JsonUserRepository();
const ratingUserRepository = new JsonRatingUserRepository();
const donorRepository = new JsonDonorRepository();

// Instancia o UseCase
const useCase = new RatingUserUseCase(userRepository, ratingUserRepository, donorRepository);

submitBtn.addEventListener('click', async () => {
  const comment = commentInput.value.trim();

  if (!comment || currentRating === 0) {
    alert("Por favor, preencha o comentário e a avaliação.");
    return;
  }
  
  
  // Em uma aplicação real, este ID viria da sessão do usuário logado.
  const appraiserId = "userTestId"; 

  const result = await useCase.execute({
    appraiserId,
    ratedId, // O ID do perfil sendo avaliado, vindo da URL
    content: comment,
    rate: currentRating
  });
  
  if (result.isRight()) {
    commentDisplay.innerHTML = `
    <strong>Você</strong> avaliou com <strong>${currentRating}/5</strong><br/>
    <p>${comment}</p>
    `;
    
    commentInput.value = '';
    currentRating = 0;
    highlightStars(0);
    ratingValue.textContent = "Nota: 0/5";
    alert("Avaliação enviada com sucesso!");
  } else {
    alert("Erro ao salvar avaliação: " + result.value.message);
  }
});


let searchBarValue = '';
document.getElementById('searchButton').addEventListener('click', handleSeachButton);
document.getElementById('searchBar').addEventListener('input', onSearchBar);

async function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${encodeURIComponent(searchBarValue)}`;
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
  console.log(searchBarValue);
}

