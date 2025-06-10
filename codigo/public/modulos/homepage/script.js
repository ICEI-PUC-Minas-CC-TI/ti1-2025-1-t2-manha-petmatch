import {PetInterface} from "../../db-interface/pet-interface.js"
import {FavoritePetInterface} from "../../db-interface/favorite-pet-interface.js";

const petInterface = new PetInterface();
const favoritePetInterface = new FavoritePetInterface()
let searchBarValue = ''
let petsList
async function handleSeachButton() {
  window.location.href = `../explore/index.html?search=${searchBarValue}`;
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

function drawElements(listOfPets, favoritedPetList) {
  


  $("#pet-card-list").empty()
  
    listOfPets.forEach(pet => {
      const favoritePetClassName = favoritedPetList.some(element => element.props.petId === pet._id) ? "favorited" : "unFavorited"
      

     $(`#cachorro`).append(` <li class="pet-card" }>
        <img src="${pet.props.imgUrls[0]}" alt="">
        <div class="pet-card-container">
          <div class="pet-card-content">
            <header class="pet-card-content-header">
              <div class="pet-card-main-info"><h3>${pet.props.name}</h3> <span>3 meses</span></div>
              <p class="pet-card-category">${pet.props.breed[0]}</p>
            </header>

            <p class="pet-card-info">${pet.props.description}</p>
          </div>


            <div class="pet-card-button-container">
              <button class="pet-card-see-pet-button" value="${pet._id}">Ver Pet</button> 
              <button class="pet-card-favorite-pet-button ${favoritePetClassName}" value="${pet._id}" id="favorite-${pet._id}"><i class="material-icons" style="color: white;">favorite</i></button>
            </div>
          </div>
        </li>`
      );
    
  });
  

}

async function handleFavoritePet(petId) {

  const pet = petsList.find(pet => pet._id === petId)
  if(pet._id) {
    const {favoritePet} = await favoritePetInterface.getFavoritePet({appraiserId: "userTestId", petId})
    if(favoritePet) {
      try{
        $(`#favorite-${pet._id}`).prop('disable', true)
        await favoritePetInterface.unfavoritePet({petId, userId: "userTestId"})
      } catch(err) {
        console.error(err)
      } finally {
        $(`#favorite-${pet._id}`).prop('disable', false)
        $(`#favorite-${pet._id}`).removeClass('favorited')
        $(`#favorite-${pet._id}`).addClass('unFavorited')
      }
    }else {
     try{
        $(`#favorite-${pet._id}`).prop('disable', true)
        await favoritePetInterface.favoritePet({petId, userId: "userTestId"})
      } catch(err) {
        console.error(err)
      } finally {
        $(`#favorite-${pet._id}`).prop('disable', false)
        $(`#favorite-${pet._id}`).removeClass('unFavorited')
        $(`#favorite-${pet._id}`).addClass('favorited')
      }
    }
  }
} 

async function fetchPets() {
    try {   
      // $('#cachorro').empty()
        const {pets} = await petInterface.fetchPets();
        const {favoritePets} = await favoritePetInterface.fetchFavoritePet({userId: "userTestId"});
        petsList = pets
        

        drawElements(petsList, favoritePets)
    }catch(err) {
        console.error(err)
    }
}
window.addEventListener("load", async () => {
  await fetchPets()

})


$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)

$(document).on("click", ".pet-card-favorite-pet-button", async function (e) {
  e.preventDefault();
  const value = e.currentTarget.value;
  
  await handleFavoritePet(value);
});

$(document).on("click", ".pet-card-see-pet-button", function (e) {
  e.preventDefault();
  const value = e.currentTarget.value;
  window.location.href = `../Detalhes/index.html?petId=${value}`
});