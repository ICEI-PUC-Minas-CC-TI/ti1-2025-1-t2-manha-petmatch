import { RegisterPetUseCase } from "../../../domain/adoption/application/use-cases/register-pet.js";
import { JsonPetRepository } from "../../../database/repositories/adoption/json-pet-repository.js";
import { DeletePetUseCase } from "../../../domain/adoption/application/use-cases/delete-pet.js";
import { FetchPetUseCase } from "../../../domain/adoption/application/use-cases/fetch-pet.js";
import { FetchPetByFilterUseCase } from "../../../domain/adoption/application/use-cases/fetch-pet-by-filter.js";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");


const registerButton = document.getElementById("registerPet");
const deleteButton = document.getElementById("deletePet");
const getPetsButton = document.getElementById("getPets");

const petData = document.getElementById("petData");
const deleteId = document.getElementById("deleteId");

const result = document.getElementById("result");

const db = new JsonPetRepository();

async function registerPet() {
    const registerFunction = new RegisterPetUseCase(db);
    try {
        const pet = await registerFunction.execute(JSON.parse(petData.value));
        console.log("register: ", pet)
        result.innerHTML = JSON.stringify(pet, null, 2);
    } catch (error) {
        console.error("Erro ao registrar pet:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

async function deletePet() {
    const deleteFunction = new DeletePetUseCase(db);
    try {
        const response = await deleteFunction.execute({ id: deleteId.value });
        result.innerHTML = response ? "Pet excluído com sucesso" : "Erro ao excluir pet";
    } catch (error) {
        console.error("Erro ao excluir pet:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

async function getPets() {
    const fetchPetUseCase = new FetchPetUseCase(db);
    try {

        console.log("asd")
        const pets = await fetchPetUseCase.execute();
        console.log("getPets: ", pets)

        result.innerHTML = JSON.stringify(pets, null, 2);
    } catch (error) {
        console.error("Erro ao buscar pets:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

async function searchPets() {
    const searchQuery = searchInput.value.trim();

    if (!searchQuery) {
        searchResults.innerHTML = "Digite um termo para buscar.";
        return;
    }

    try {
        const fetchPetUseCase = new FetchPetByFilterUseCase(db);
        const response = await fetchPetUseCase.execute({ search: searchQuery });

        searchResults.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar pets:", error);
        searchResults.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

searchButton.addEventListener("click", searchPets);


registerButton.addEventListener('click', registerPet);
deleteButton.addEventListener('click', deletePet);
getPetsButton.addEventListener('click', () => getPets());

window.addEventListener("load", () => {
    petData.value = JSON.stringify({
        name: "Buddy",
        animalTypeId: "dog",
        size: "medium",
        animalSex: "male",
        description: "Um cão amigável e brincalhão.",
        imgUrls: ["https://example.com/buddy.jpg"],
        bornAt: "2022-03-15",
        breed: ["Golden Retriever"],
        vaccinated: true,
        castrated: true,
        availableForAdoption: true,
        personality: ["brincalhão", "carinhoso"],
        donorId: "12345",
        availableForAdoption: false,
        id: "67890"
    }, null, 2);
});