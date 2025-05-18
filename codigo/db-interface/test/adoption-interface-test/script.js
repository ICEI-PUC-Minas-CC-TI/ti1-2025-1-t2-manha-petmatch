import { AdoptionInterface } from "../../adoption-interface.js";

const adoptionManager = new AdoptionInterface();

const registerAdoptionButton = document.getElementById("registerAdoptionButton");
const fetchAdoptionByDonorButton = document.getElementById("fetchAdoptionByDonorButton");
const fetchAdoptionByUserButton = document.getElementById("fetchAdoptionByUserButton");

const userId = document.getElementById("userId");
const donorId = document.getElementById("donorId");
const petId = document.getElementById("petId");

const donorIdFetch = document.getElementById("donorIdFetch");
const userIdFetch = document.getElementById("userIdFetch");

const result = document.getElementById("result");

async function registerAdoption() {
    try {
        const response = await adoptionManager.registerAdoption({
            userId: userId.value,
            donorId: donorId.value,
            petId: petId.value
        });
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error(error)
        result.innerHTML = "Erro ao registrar adoção.";
    }
}

async function fetchAdoptionByDonorId() {
    try {
        const response = await adoptionManager.fetchAdoptionByDonorId({ donorId: donorIdFetch.value });
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao listar adoções por doador.";
    }
}

async function fetchAdoptionByUserId() {
    try {
        const response = await adoptionManager.fetchAdoptionByUserId({ userId: userIdFetch.value });
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        result.innerHTML = "Erro ao listar adoções por usuário.";
    }
}

registerAdoptionButton.addEventListener("click", registerAdoption);
fetchAdoptionByDonorButton.addEventListener("click", fetchAdoptionByDonorId);
fetchAdoptionByUserButton.addEventListener("click", fetchAdoptionByUserId);