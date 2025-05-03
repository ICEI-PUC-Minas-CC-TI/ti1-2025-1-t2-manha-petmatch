import { GetAnimalTypeUseCase } from "../../../domain/adoption/application/use-cases/get-animal-type.js";
import { FetchAnimalTypeUseCase } from "../../../domain/adoption/application/use-cases/fetch-animal-type.js";
import { JsonAnimalTypeRepository } from "../../../database/repositories/adoption/json-animal-type-repository.js";

const getAnimalTypeButton = document.getElementById("getAnimalType");
const fetchAnimalTypesButton = document.getElementById("fetchAnimalTypes");
const animalTypeId = document.getElementById("animalTypeId");
const result = document.getElementById("result");

const db = new JsonAnimalTypeRepository();

// Função para obter um Tipo de Animal pelo ID
async function getAnimalType() {
    const id = animalTypeId.value.trim();
    if (!id) {
        result.innerHTML = "Digite um ID para buscar.";
        return;
    }

    try {
        const getAnimalTypeUseCase = new GetAnimalTypeUseCase(db);
        const response = await getAnimalTypeUseCase.execute({ id });

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar Tipo de Animal:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

// Função para listar todos os Tipos de Animais
async function fetchAnimalTypes() {
    try {
        const fetchAnimalTypeUseCase = new FetchAnimalTypeUseCase(db);
        const response = await fetchAnimalTypeUseCase.execute();

        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao listar Tipos de Animais:", error);
        result.innerHTML = "Ocorreu um erro. Verifique o console.";
    }
}

getAnimalTypeButton.addEventListener("click", getAnimalType);
fetchAnimalTypesButton.addEventListener("click", fetchAnimalTypes);