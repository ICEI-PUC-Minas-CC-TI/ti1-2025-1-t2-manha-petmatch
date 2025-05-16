import {AnimalTypeInterface} from "../../interface/animal-type-interface.js"
const petInterface = new PetInterface();
let searchBarValue = ''

async function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}
const animaltypeinterface = new AnimalTypeInterface()
async function puxabicho(){
    var bichos = await animaltypeinterface.fetchAnimalType();
    const{animaltypes} = bichos
    animaltypes.foreach((element)=>{$('#animal-type-container').append(`<div id="" class="tipos">
        <img class="imagem-categorias" src="${element.props.img_url_reference}" alt="Foto cachorro">

        <div>
            <p class="escrito-card">${element.props.type}</p>
        </div>`)})
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

window.addEventListener("load,", async () => {
    await puxabicho();
})


