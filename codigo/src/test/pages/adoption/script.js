import { RegisterAdoptionUseCase } from "../../../domain/adoption/application/use-cases/register-adoption.js";
import { FetchAdoptionByUserUseCase } from "../../../domain/adoption/application/use-cases/fetch-adoption-by-user.js";
import { FetchAdoptionByDonorUseCase } from "../../../domain/adoption/application/use-cases/fetch-adoption-by-donor.js";

import { JsonAdoptionRepository } from "../../../database/repositories/adoption/json-adoption-repository.js";
import { JsonUserRepository } from "../../../database/repositories/adoption/json-user-repository.js";
import { JsonDonorRepository } from "../../../database/repositories/adoption/json-donor-repository.js";
import { JsonPetRepository } from "../../../database/repositories/adoption/json-pet-repository.js";

const adoptPetButton = document.getElementById("adoptPetButton");
const fetchAdoptedPetsButton = document.getElementById("fetchAdoptedPetsButton");

const fetchAdoptedPetsButtonDonor = document.getElementById("fetchAdoptedPetsButtonDonor")


const userId = document.getElementById("userId");
const donorId = document.getElementById("donorId");
const petId = document.getElementById("petId");

const userIdFetch = document.getElementById("userIdFetch");
const donorIdFetch = document.getElementById("donorIdFetch");

const result = document.getElementById("result");

const adoptionDb = new JsonAdoptionRepository();
const userDb = new JsonUserRepository();
const donorDb = new JsonDonorRepository();
const petDb = new JsonPetRepository();

// Função para registrar adoção
async function registerAdoption() {
    try {
        const registerAdoptionUseCase = new RegisterAdoptionUseCase(adoptionDb, userDb, donorDb, petDb);
        const response = await registerAdoptionUseCase.execute({
            userId: userId.value,
            donorId: donorId.value,
            petId: petId.value
        });

        console.log(response)

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao registrar adoção:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

// Função para listar pets adotados pelo usuário
async function fetchAdoptedPets() {
    try {
        const fetchAdoptionByUserUseCase = new FetchAdoptionByUserUseCase(adoptionDb, userDb);
        const response = await fetchAdoptionByUserUseCase.execute({
            userId: userIdFetch.value
        });

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao listar pets adotados:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

async function fetchAdoptedPetsDonor() {
    try {
        const fetchAdoptionByDonorUseCase = new FetchAdoptionByDonorUseCase(adoptionDb, donorDb);
        const response = await fetchAdoptionByDonorUseCase.execute({
            donorId: donorIdFetch.value
        });

        console.log(donorIdFetch.value)

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao listar pets adotados:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

adoptPetButton.addEventListener("click", registerAdoption);
fetchAdoptedPetsButton.addEventListener("click", fetchAdoptedPets);

fetchAdoptedPetsButtonDonor.addEventListener("click", fetchAdoptedPetsDonor)