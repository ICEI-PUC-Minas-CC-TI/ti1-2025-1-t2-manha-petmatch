import {PetInterface} from "../../db-interface/pet-interface.js"

const petInterface = new PetInterface();
const urlParams = new URL(window.location)

const searchParam = urlParams.searchParams.get('search');
let searchBarValue = searchParam ? searchParam : ''
let petList = [];

function splitSearchParamsWords(search) {
  if(!search) {
    return []
  } else {
    return search.split(" ")
  }
}

async function handleSeachButton() {
  await fetchPets(searchBarValue)
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

async function fetchPets(search) {
    try {   
      $('#cachorro').empty()
        const searchValues = splitSearchParamsWords(search) 
        let response;

        response = await petInterface.fetchPetsBySearch({search: searchValues});
        const {pets} = response;


        pets.forEach(pet => {
           $('#cachorro').append(` <li class="pet-card">
              <img src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="">
              <div class="pet-card-container">
                <div class="pet-card-content">
                  <header class="pet-card-content-header">
                    <div class="pet-card-main-info"><h3>${pet.name}</h3> <span>3 meses</span></div>
                    <p class="pet-card-category">${pet.breed[0]}</p>
                  </header>

                  <p class="pet-card-info">${pet.description}</p>
                </div>


                  <div class="pet-card-button-container">
                    <button class="pet-card-see-pet-button">Ver Pet</button> 
                    <button class="pet-card-favorite-pet-button"><i class="material-icons" style="color: white;">favorite</i></button>
                  </div>
                </div>
              </li>`
            );
          
        });
        console.log(pets)
    }catch(err) {
        console.error(err)
    }
}
window.addEventListener("load", async () => {
  $("#searchBar").val(searchBarValue);
  await fetchPets(searchParam)
})

$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)


const buttonPetHtmlText = `
 <div class="pet-card">
        <img src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg" alt="">
        <div class="pet-card-container">
          <div class="pet-card-content">
            <header class="pet-card-content-header">
              <div class="pet-card-main-info"><h3>Scooby</h3> <span>3 meses</span></div>
              <p class="pet-card-category">cachorro-Macho</p>
            </header>

            <p class="pet-card-info">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati quia magnam delectu.</p>
          </div>


            <div class="pet-card-button-container">
              <button class="pet-card-see-pet-button">Ver Pet</button> 
              <button class="pet-card-favorite-pet-button"><i class="material-icons" style="color: white;">favorite</i></button>
            </div>
          </div>
        </div>
            ` 