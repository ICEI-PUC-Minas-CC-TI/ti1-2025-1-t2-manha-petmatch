import {AnimalTypeInterface} from "../../db-interface/animal-type-interface.js"
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
    const {animaltypes} = bichos;
    console.log('oi', animaltypes);
    animaltypes.forEach((element)=>{ 
        console.log(element);
        $('#animal-type-container').append(`<div id="" class="tipos">
        <img class="imagem-categorias" src="${element.props.imgUrlReference}" alt="Foto cachorro">

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
    

window.addEventListener("load", async () => {
    await puxabicho();
})


