import {AnimalTypeInterface} from "../../db-interface/animal-type-interface.js"
let searchBarValue = ''

async function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
  console.log(searchBarValue)
}
$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)

const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const submitBtn = document.getElementById('submitBtn');
const commentDisplay = document.getElementById('submitted-comment');

let currentRating = 0;

// Controle das estrelas
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
    ratingValue.textContent = `Avaliação: ${currentRating}/5`;
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

// Enviar comentário
submitBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment || currentRating === 0) {
    alert("Por favor, preencha o nome, o comentário e a avaliação.");
    return;
  }

  commentDisplay.innerHTML = `
    <strong>${name}</strong> avaliou com <strong>${currentRating}/5</strong><br/>
    <p>${comment}</p>
  `;

  // Limpar os campos
  nameInput.value = '';
  commentInput.value = '';
});