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

fetchAnimalTypeButton.addEventListener("click", fetchAnimalType);