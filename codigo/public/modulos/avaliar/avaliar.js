// avaliar.js
import { JsonRatingUserRepository } from "../../src/database/repositories/adoption/json-rating-user-repository.js";
import { RatingUserUseCase } from "../../src/domain/adoption/application/use-cases/rating-user.js";
import { JsonUserRepository } from "../../src/database/repositories/adoption/json-user-repository.js";
import { JsonDonorRepository } from "../../src/database/repositories/adoption/json-donor-repository.js";
import { AnimalTypeInterface } from "../../db-interface/animal-type-interface.js";
import { CurrentSession } from "../../utils/current-session.js";
import { DonorInterface } from "../../db-interface/donor-interface.js";
import { UserInterface } from "../../db-interface/user-interface.js";

const userInterface = new UserInterface();
const donorInterface = new DonorInterface();
const session = new CurrentSession();

const urlParams = new URLSearchParams(window.location.search);
const ratedId = urlParams.get("ratedId");

if (!ratedId) {
  alert("Erro: Nenhum usuário foi definido para avaliação. Por favor, forneça um 'ratedId' na URL.");
}

async function fetchAndRenderDonorInfo() {
  try {
    const { donor } = await donorInterface.getDonorById({ id: ratedId });
    const user = await userInterface.getUserById({ id: donor.props.userId });

    $('#img').attr('src', user.user.props.imgUrl);
    $('#name').text(user.user.props.name);
  } catch (error) {
    console.error('Erro ao carregar dados do doador:', error);
  }
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
    star.classList.remove('active');
    if (+star.getAttribute('data-value') <= value) {
      star.classList.add('active');
    }
  });
}

const userRepository = new JsonUserRepository();
const ratingUserRepository = new JsonRatingUserRepository();
const donorRepository = new JsonDonorRepository();
const useCase = new RatingUserUseCase(userRepository, ratingUserRepository, donorRepository);

submitBtn.addEventListener('click', async () => {
  const comment = commentInput.value.trim();

  if (!comment || currentRating === 0) {
    alert("Por favor, preencha o comentário e a avaliação.");
    return;
  }

  const result = await useCase.execute({
    appraiserId: session.userId,
    ratedId,
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
    await fetchAndRenderPreviousRatings();
  } else {
    alert("Erro ao salvar avaliação: " + result.value.message);
  }
});

async function fetchAndRenderPreviousRatings() {
  try {
    const result = await ratingUserRepository.findByRatedId(ratedId);
    const ratings = result.ratingUser;

    if (!ratings || ratings.length === 0) {
      document.getElementById("comments-list").innerHTML = "<p>Nenhuma avaliação disponível ainda.</p>";
      return;
    }

    const namesMap = {};
    await Promise.all(ratings.map(async (rating) => {
      try {
        const { user } = await userInterface.getUserById({ id: rating.appraiserId });
        namesMap[rating.appraiserId] = user.props.name;
      } catch {
        namesMap[rating.appraiserId] = "(Usuário desconhecido)";
      }
    }));

    const html = ratings.map(rating => `
      <div class="rating-entry">
        <p><strong>${namesMap[rating.appraiserId]}</strong> avaliou com <strong>${rating.rate}/5</strong></p>
        <p>${rating.content}</p>
        <hr/>
      </div>
    `).join("");

    document.getElementById("comments-list").innerHTML = html;
  } catch (error) {
    console.error("Erro ao carregar avaliações:", error);
    document.getElementById("comments-list").innerHTML = "<p>Erro ao carregar avaliações.</p>";
  }
}

window.addEventListener("load", async () => {
  await fetchAndRenderDonorInfo();
  await fetchAndRenderPreviousRatings();
});

let searchBarValue = '';
document.getElementById('searchButton').addEventListener('click', handleSeachButton);
document.getElementById('searchBar').addEventListener('input', onSearchBar);

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
}

$('#request-btn').click(function () {
  $('#request-modal').fadeIn();
});

$('#close-request-modal').click(function () {
  $('#request-modal').fadeOut();
});
