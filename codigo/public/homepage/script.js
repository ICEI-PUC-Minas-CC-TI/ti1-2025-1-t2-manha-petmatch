import {PetInterface} from "../../db-interface/pet-interface.js"
import {FavoritePetInterface} from "../../db-interface/favorite-pet-interface.js";

const petInterface = new PetInterface();
let searchBarValue = ''

async function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

function drawElements(listOfPets, favoritedPetList) {
  const petsByType = separatePetsByType(listOfPets)


  $("#pet-card-list-container").empty()
  for(let type in petsByType) {
    petsByType[type].forEach(pet => {

      const favoritePetClassName = favoritedPetList.some(element => element.props.petId === pet.id) ? "favorited" : "unFavorited"

      const containerAlredyExists = $(`#container-${type}`).length > 0

      if(!containerAlredyExists){
        $('#pet-card-list-container').append(`
            <div class="pet-card-list-content" id="container-${type}">
              <h3>${type}</h3>
              <ul class="pet-card-list" id="${type}">       
              </ul>
            </div>
        `)
      }

     $(`#${type}`).append(` <li class="pet-card" }>
        <img src="${pet.img_urls}" alt="">
        <div class="pet-card-container">
          <div class="pet-card-content">
            <header class="pet-card-content-header">
              <div class="pet-card-main-info"><h3>${pet.name}</h3> <span>3 meses</span></div>
              <p class="pet-card-category">${pet.breed[0]}</p>
            </header>

            <p class="pet-card-info">${pet.description}</p>
          </div>


            <div class="pet-card-button-container">
              <button class="pet-card-see-pet-button" value="${pet.id}">Ver Pet</button> 
              <button class="pet-card-favorite-pet-button ${favoritePetClassName}" value="${pet.id}" id="favorite-${pet.id}"><i class="material-icons" style="color: white;">favorite</i></button>
            </div>
          </div>
        </li>`
      );
    
  });
  }

}

async function handleFavoritePet(petId) {

const pet = petsList.find(pet => pet.id === petId)

if(pet.id) {
const {favoritePet} = await favoritePetInterface.getFavoritePet({appraiserId: "userTestId", petId})
if(favoritePet) {
try{
  $(`favorite-${pet.id}`).prop('disable', true)
  await favoritePetInterface.unfavoritePet({petId, userId: "userTestId"})
} catch(err) {
  console.error(err)
} finally {
  $(`favorite-${pet.id}`).prop('disable', false)
  $(`favorite-${pet.id}`).removeClass('favorited')
  $(`favorite-${pet.id}`).addClass('unFavorited')
}
}else {
try{
  $(`favorite-${pet.id}`).prop('disable', true)
  await favoritePetInterface.favoritePet({petId, userId: "userTestId"})
} catch(err) {
  console.error(err)
} finally {
  $(`favorite-${pet.id}`).prop('disable', false)
  $(`favorite-${pet.id}`).removeClass('unFavorited')
  $(`favorite-${pet.id}`).addClass('favorited')
}
}
}
} 

async function fetchPets() {
    try {   
      $('#cachorro').empty()
        let response;
        response = await petInterface.fetchPets();
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
  await fetchPets(searchParam)
})

$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)


