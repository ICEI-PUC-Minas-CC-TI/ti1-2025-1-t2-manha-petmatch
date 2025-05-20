import { AnimalTypeInterface } from "../../db-interface/animal-type-interface.js";
const classificando = document.getElementById("classificacao");


// Instanciando
const animalTypeInterface = new AnimalTypeInterface();

async function buscaCategoria() {
  try {
    const response = await animalTypeInterface.fetchAnimalType();
    const { animaltypes } = response // Para deixar mais bonito == response.animaltypes
    console.log(response);
    let textoHTML = "";
    animaltypes.forEach(element => {
      textoHTML += ` <option value="${element._id}">${element.props.type}</option>`
    });
    console.log("Esse é o texto html" + textoHTML);

    classificando.innerHTML = textoHTML;



  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("load", async function () {
  await buscaCategoria()

})
