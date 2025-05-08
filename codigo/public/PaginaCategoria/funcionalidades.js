import {AnimalTypeInterface} from "../../interface/animal-type-interface.js"
const animaltypeinterface = new AnimalTypeInterface()
async function puxabicho(){
    var bichos = await animaltypeinterface.fetchAnimalType();
}
async function pegabicho(){
   try {
        const bichos = await animalTypeManager.getAnimalType({id: animalTypeId.value});
        result.innerHTML = JSON.stringify(response, null, 2);
    } catch (error) {
        console.error("Erro ao buscar tipo de animal:", error);
        result.innerHTML = "Erro ao buscar tipo de animal.";
    }
}
    bichos.foreach((elemento) => elemento.id);