import { AnimalTypeInterface } from "../../animal-type-interface.js";

const animalTypeManager = new AnimalTypeInterface();
const fetchAnimalTypeButton = document.getElementById("fetchAnimalTypeButton");
const result = document.getElementById("result");

async function fetchAnimalType() {
    try {
        const response = await animalTypeManager.fetchAnimalType();
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.log(error)
        result.innerHTML = "Erro ao buscar tipos de animais.";
    }
}
const getAnimalTypeButton = document.getElementById("getAnimalTypeButton");
const animalTypeId = document.getElementById("animalTypeId");

async function getAnimalType() {
    try {
        const response = await animalTypeManager.getAnimalType({id: animalTypeId.value});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar tipo de animal:", error);
        result.innerHTML = "Erro ao buscar tipo de animal.";
    }
}

getAnimalTypeButton.addEventListener("click", getAnimalType);

fetchAnimalTypeButton.addEventListener("click", fetchAnimalType);