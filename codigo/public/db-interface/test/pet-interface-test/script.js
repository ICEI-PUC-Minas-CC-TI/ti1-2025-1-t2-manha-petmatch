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
        const response = await petManager.registerPetInterface({petInfo: {
            ...JSON.parse(petInfo.value),
            donorId: donorIdRegister.value
        }});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao registrar pet.";
        console.error(error)
    }

}

async function fetchFavoritePets() {
    try {
        const response = await petManager.fetchFavoritePet({ userId: userIdFetchFavorites.value});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao listar pets favoritos.";
        console.error(error)
    }
}

async function getPet() {
    try {
        const response = await petManager.getPetById({id: petId.value});
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
        const response = await petManager.fetchPetsBySearch({search: ["vendaval"]});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao buscar pets por categoria.";
    }
}

async function favoritePet() {
    try {
        const response = await petManager.favoritePet({petId: favoritePetId.value, userId: userId.value});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao favoritar pet.";
        console.error(error)
    }
}

async function unfavoritePet() {
    try {
        const response = await petManager.unfavoritePet({petId: unfavoritePetId.value, userId: userIdUnfavorite.value});
        result.innerHTML = "Pet desfavoritado com sucesso.";
    } catch (error) {
        result.innerHTML = "Erro ao desfavoritar pet.";
    }
}

async function deletePet() {
    try {
        const response = await petManager.deletePet({petId: deletePetId.value, donorId: donorId.value});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao deletar pet.";
    }
}

async function editPet() {
    try {
        const value = JSON.parse(editPetData.value)

        const response = await petManager.editPet({pet: value, petId: value.id, donorId: donorIdEdit.value});

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao editar pet.";
        console.error(error)

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
