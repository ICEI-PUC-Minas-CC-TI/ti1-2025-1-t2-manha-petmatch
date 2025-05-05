import { PetInterface } from "../../pet-interface.js";

const petManager = new PetInterface();

const registerPetButton = document.getElementById("registerPetButton");
const getPetButton = document.getElementById("getPetButton");
const fetchPetsButton = document.getElementById("fetchPetsButton");
const fetchPetsByCategoryButton = document.getElementById("fetchPetsByCategoryButton");
const favoritePetButton = document.getElementById("favoritePetButton");
const unfavoritePetButton = document.getElementById("unfavoritePetButton");
const deletePetButton = document.getElementById("deletePetButton");
const editPetButton = document.getElementById("editPetButton");

const petInfo = document.getElementById("petInfo");
const petId = document.getElementById("petId");
const searchCategory = document.getElementById("searchCategory");
const favoritePetId = document.getElementById("favoritePetId");
const userId = document.getElementById("userId");
const unfavoritePetId = document.getElementById("unfavoritePetId");
const userIdUnfavorite = document.getElementById("userIdUnfavorite");
const deletePetId = document.getElementById("deletePetId");
const donorId = document.getElementById("donorId");
const editPetData = document.getElementById("editPetData");
const donorIdEdit = document.getElementById("donorIdEdit");
const result = document.getElementById("result");
const donorIdRegister = document.getElementById("donorIdRegister")
const userIdFetchFavorites = document.getElementById("userIdFetchFavorites")
const fetchFavoritePetsButton = document.getElementById("fetchFavoritePetsButton")

async function registerPet() {
    try {
        const response = await petManager.registerPetInterface({
            ...JSON.parse(petInfo.value),
            donorId: donorIdRegister.value
        });
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao registrar pet.";
        console.log(error)
    }

}

async function fetchFavoritePets() {
    try {
        const response = await petManager.fetchFavoritePet(userIdFetchFavorites.value);
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao listar pets favoritos.";
        console.log(error)
    }
}

async function getPet() {
    try {
        const response = await petManager.getPetById(petId.value);
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao buscar pet.";
    }
}

async function fetchPets() {
    try {
        const response = await petManager.fetchPets();
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao listar pets.";
    }
}

async function fetchPetsByCategory() {
    try {
        const response = await petManager.fetchPetsByCategory(searchCategory.value);
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao buscar pets por categoria.";
    }
}

async function favoritePet() {
    try {
        const response = await petManager.favoritePet(favoritePetId.value, userId.value);
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao favoritar pet.";
        console.log(error)
    }
}

async function unfavoritePet() {
    try {
        const response = await petManager.unfavoritePet(unfavoritePetId.value, userIdUnfavorite.value);
        result.innerHTML = "Pet desfavoritado com sucesso.";
    } catch (error) {
        result.innerHTML = "Erro ao desfavoritar pet.";
    }
}

async function deletePet() {
    try {
        const response = await petManager.deletePet(deletePetId.value, donorId.value);
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao deletar pet.";
    }
}

async function editPet() {
    try {
        const value = JSON.parse(editPetData.value)

        const response = await petManager.editPet(value, value.id, donorIdEdit.value);

        console.log(response)
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao editar pet.";
        console.log(error)

    }
}

registerPetButton.addEventListener("click", registerPet);
getPetButton.addEventListener("click", getPet);
fetchPetsButton.addEventListener("click", fetchPets);
fetchPetsByCategoryButton.addEventListener("click", fetchPetsByCategory);
favoritePetButton.addEventListener("click", favoritePet);
unfavoritePetButton.addEventListener("click", unfavoritePet);
deletePetButton.addEventListener("click", deletePet);
editPetButton.addEventListener("click", editPet);
fetchFavoritePetsButton.addEventListener("click", fetchFavoritePets);
