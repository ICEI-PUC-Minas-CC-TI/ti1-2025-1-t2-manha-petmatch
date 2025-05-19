import { FavoritePetUseCase } from "../../../domain/adoption/application/use-cases/favorite-pet.js";
import { FetchFavoritePetUseCase } from "../../../domain/adoption/application/use-cases/fetch-favorite-pet.js";
import { UnfavoritePetUseCase } from "../../../domain/adoption/application/use-cases/unfavorite-pet.js";
import { JsonFavoritePetRepository } from "../../../database/repositories/adoption/json-favorite-pet-repository.js";
import { JsonUserRepository } from "../../../database/repositories/adoption/json-user-repository.js";

const favoritePetButton = document.getElementById("favoritePetButton");
const fetchFavoritesButton = document.getElementById("fetchFavoritesButton");
const unfavoritePetButton = document.getElementById("unfavoritePetButton");

const favoritePetId = document.getElementById("favoritePetId");
const appraiserId = document.getElementById("appraiserId");

const appraiserIdFetch = document.getElementById("appraiserIdFetch");

const unfavoritePetId = document.getElementById("unfavoritePetId");
const appraiserIdUnfavorite = document.getElementById("appraiserIdUnfavorite");

const result = document.getElementById("result");

const favoritePetDb = new JsonFavoritePetRepository();
const userDb = new JsonUserRepository();

// Função para favoritar um pet
async function favoritePet() {
    try {
        const favoritePetUseCase = new FavoritePetUseCase(favoritePetDb, userDb);
        const response = await favoritePetUseCase.execute({
            petId: favoritePetId.value,
            appraiserId: appraiserId.value
        });


        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao favoritar pet:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

// Função para listar todos os pets favoritos do usuário
async function fetchFavorites() {
    try {
        const fetchFavoritePetUseCase = new FetchFavoritePetUseCase(favoritePetDb, userDb);
        const response = await fetchFavoritePetUseCase.execute({
            appraiserId: appraiserIdFetch.value
        });

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao listar favoritos:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

// Função para desfavoritar um pet
async function unfavoritePet() {
    try {
        const unfavoritePetUseCase = new UnfavoritePetUseCase(favoritePetDb, userDb);
       const result = await unfavoritePetUseCase.execute({
            petId: unfavoritePetId.value,
            appraiserId: appraiserIdUnfavorite.value
        });


        result.innerHTML = "Pet desfavoritado com sucesso.";
    } catch (error) {
        console.error("Erro ao desfavoritar pet:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

favoritePetButton.addEventListener("click", favoritePet);
fetchFavoritesButton.addEventListener("click", fetchFavorites);
unfavoritePetButton.addEventListener("click", unfavoritePet);