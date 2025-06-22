import { FavoritePetInterface } from '../../db-interface/favorite-pet-interface.js';
import { SessionInterface } from '../../db-interface/session-interface.js';

const favoriteInterface = new FavoritePetInterface();
const sessionInterface = new SessionInterface();

let sessionUserId = null;

async function verificarSessao() {
  const session = await sessionInterface.checkSession();

  // Corrigido: usuário está em session.value.user
  if (session?.value?.user?._id) {
    sessionUserId = session.value.user._id;
    console.log("✅ Sessão verificada:", sessionUserId);
    exibirFavoritosDoUsuario(sessionUserId);
  } else {
    console.warn("⚠️ Sessão inválida ou não encontrada.");
  }
}

async function exibirFavoritosDoUsuario(userId) {
  try {
    const favoritesPets = await favoriteInterface.fetchFavoritePet({ userId });

    console.log("🐾 Pets favoritados:", favoritesPets);

    const container = document.getElementById("favoritos-container");
    container.innerHTML = "";

    if (!favoritesPets || favoritesPets.length === 0) {
      container.innerHTML = "<p>Nenhum pet favoritado.</p>";
      return;
    }

    favoritesPets.forEach((fav) => {
      const pet = fav.pet?.props;
      const petId = fav.pet?._id;
      if (!pet || !petId) return;

      const petCard = document.createElement("div");
      petCard.className = "pet-card";
      petCard.innerHTML = `
        <img src="${pet.imageUrl || pet.imgUrls?.[0] || ''}" alt="${pet.name}" />
        <div class="pet-card-container">
          <div class="pet-card-content">
            <header class="pet-card-content-header">
              <div class="pet-card-main-info"><h3>${pet.name}</h3> <span>${pet.age}</span></div>
              <p class="pet-card-category">${pet.breed?.[0] ?? pet.breed ?? ""}</p>
            </header>
            <p class="pet-card-info">${pet.description ?? ""}</p>
          </div>
          <div class="pet-card-button-container">
            <button class="pet-card-see-pet-button" value="${petId}">Ver Pet</button>
            <button class="pet-card-favorite-pet-button favorited" value="${petId}" id="favorite-${petId}">
              <i class="material-icons" style="color: white;">favorite</i>
            </button>
          </div>
        </div>
      `;
      container.appendChild(petCard);
    });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
  }
}

async function handleFavoriteToggle(petId) {
  const { favoritePet } = await favoriteInterface.getFavoritePet({ appraiserId: sessionUserId, petId });

  const button = document.getElementById(`favorite-${petId}`);
  if (!button) return;

  button.disabled = true;
  try {
    if (favoritePet) {
      await favoriteInterface.unfavoritePet({ petId, userId: sessionUserId });
      button.classList.remove("favorited");
      button.classList.add("unFavorited");
    } else {
      await favoriteInterface.favoritePet({ petId, userId: sessionUserId });
      button.classList.remove("unFavorited");
      button.classList.add("favorited");
    }
  } catch (err) {
    console.error(err);
  } finally {
    button.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await verificarSessao();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".pet-card-favorite-pet-button")) {
    const petId = e.target.closest("button").value;
    handleFavoriteToggle(petId);
  }

  if (e.target.closest(".pet-card-see-pet-button")) {
    const petId = e.target.closest("button").value;
    window.location.href = `../Detalhes/index.html?petId=${petId}`;
  }
});
