import { AnimalTypeInterface } from '../../db-interface/animal-type-interface.js';

const classificando = document.getElementById("classificacao");
const animalTypeInterface = new AnimalTypeInterface();

async function buscaCategoria() {
  try {
    const response = await animalTypeInterface.fetchAnimalType();


    console.log("Resposta completa de fetchAnimalType:", response);

    const animaltypes = response?.animaltypes || response?.animalTypes;

    if (!Array.isArray(animaltypes)) {
      console.error("animaltypes está em formato inválido:", animaltypes);
      return;
    }

    console.log("Lista de tipos de animal (array):", animaltypes);

    let textoHTML = "";
    animaltypes.forEach((animal) => {
      console.log("Animal type individual:", animal);

    
      const id = animal?.id || animal?._id || animal?.props?.id;
      const nome = animal?.type || animal?.props?.type;

      if (!id || !nome) {
        console.warn("Tipo de animal inválido (id ou nome ausente):", animal);
        return;
      }

      textoHTML += `<option value="${id}">${nome}</option>`;
    });

    classificando.innerHTML = textoHTML;
    console.log("HTML final do <select>:", textoHTML);

  } catch (error) {
    console.error("Erro ao buscar categorias de animal:", error);
  }
}

window.addEventListener("load", buscaCategoria);
