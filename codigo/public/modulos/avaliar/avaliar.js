
import { JsonRatingUserRepository } from "../../src/database/repositories/adoption/json-rating-user-repository.js";
import { RatingUserUseCase } from "../../src/domain/adoption/application/use-cases/rating-user.js";

class UserRepository {
  async findById(id) {
    return { user: { id } };
  }
}

const ratingRepository = new JsonRatingUserRepository();
const userRepository = new UserRepository();
const useCase = new RatingUserUseCase(userRepository, ratingRepository);

// Captura do ratedId da URL (ex: avaliar.html?userId=abcd1234)
const urlParams = new URLSearchParams(window.location.search);
const ratedId = urlParams.get("userId");

if (!ratedId) {
  alert("Erro: Nenhum usuário foi definido para avaliação.");
}

// -------------------- Avaliação UI --------------------
let searchBarValue = '';

function onSearchBar(event) {
  searchBarValue = event.target.value;
}
$("#searchBar").on("propertychange input", onSearchBar);
$("#searchButton").click(() => {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
});

const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
const nameInput = document.getElementById('name');
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

function highlightStars(rating) {
  stars.forEach(star => {
    star.classList.remove('hover', 'selected');
    const value = +star.getAttribute('data-value');
    if (value <= rating) {
      star.classList.add('selected');
    }
  });
}

// Evento de envio de avaliação
submitBtn.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment || currentRating === 0) {
    alert("Por favor, preencha o nome, o comentário e a avaliação.");
    return;
  }

  // Simulação de quem está logado
  const appraiserId = "userTestId";

  const result = await useCase.execute({
    appraiserId,
    ratedId,
    content: comment,
    rate: currentRating
  });

  if (result.isRight()) {
    commentDisplay.innerHTML = `
      <strong>${name}</strong> avaliou com <strong>${currentRating}/5</strong><br/>
      <p>${comment}</p>
    `;

    nameInput.value = '';
    commentInput.value = '';
    currentRating = 0;
    highlightStars(0);
    ratingValue.textContent = "Nota: 0/5";
  } else {
    alert("Erro ao salvar avaliação: " + result.value.message);
  }
});
