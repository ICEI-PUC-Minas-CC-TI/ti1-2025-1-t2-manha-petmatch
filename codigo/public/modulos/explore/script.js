import {PetInterface} from "../../db-interface/pet-interface.js"
import {AnimalTypeInterface} from  "../../db-interface/animal-type-interface.js"
import {FavoritePetInterface} from '../../db-interface/favorite-pet-interface.js'
const petInterface = new PetInterface();
const animalTypeInterface = new AnimalTypeInterface();
const favoritePetInterface = new FavoritePetInterface();
const urlParams = new URL(window.location)

const searchParam = urlParams.searchParams.get('search');
let searchBarValue = searchParam ? searchParam : ''
let animalTypeList = []
let petsList = []

function splitSearchParamsWords(search) {
  if(!search) {
    return []
  } else {
    return search.split(" ")
  }
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
        $(`#favorite-${pet.id}`).prop('disable', true)
        await favoritePetInterface.unfavoritePet({petId, userId: "userTestId"})
      } catch(err) {
        console.error(err)
      } finally {
        $(`#favorite-${pet.id}`).prop('disable', false)
        $(`#favorite-${pet.id}`).removeClass('favorited')
        $(`#favorite-${pet.id}`).addClass('unFavorited')
      }
    }else {
     try{
        $(`#favorite-${pet.id}`).prop('disable', true)
        await favoritePetInterface.favoritePet({petId, userId: "userTestId"})
      } catch(err) {
        console.error(err)
      } finally {
        $(`#favorite-${pet.id}`).prop('disable', false)
        $(`#favorite-${pet.id}`).removeClass('unFavorited')
        $(`#favorite-${pet.id}`).addClass('favorited')
      }
    }
  }
} 

async function handleSeachButton() {
  verifySeachBarValue()
  await fetchPets(searchBarValue)
}

function verifySeachBarValue() {
        animalTypeList.forEach(animalType => {
        if(animalType.props.type.toLowerCase() === searchBarValue.toLowerCase()) {
          searchBarValue = animalType._id;
        }
      })
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

async function fetchAnimalTypes() {
  try {
      const response = await animalTypeInterface.fetchAnimalType();
      animalTypeList = response.animaltypes;
      verifySeachBarValue()
  } catch(err) {
    console.error(err)
  }
}

async function fetchPets(search) {
    try {   
      $('#cachorro').empty()
        const searchValues = splitSearchParamsWords(search) 
        const {pets} = await petInterface.fetchPetsBySearch({search: searchValues});
        const {favoritePets} = await favoritePetInterface.fetchFavoritePet({userId: "userTestId"});

        petsList = pets
        

        drawElements(pets, favoritePets)
    }catch(err) {
        console.error(err)
    }
}

function separatePetsByType(petList) {
  let petObject = {}
  animalTypeList.forEach((animalType) => {
    const areTherePetsWithType = petList.some((pet) => pet.animal_type_id === animalType._id)   
    
    if(areTherePetsWithType) {
      petObject[animalType.props.type] = petList.filter(pet => pet.animal_type_id === animalType._id)
    }
  }) 

  return petObject
}







window.addEventListener("load", async () => {
  $("#searchBar").val(searchBarValue);
  await fetchAnimalTypes()
  await fetchPets(searchBarValue)

})

$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)

$(document).on("click", ".pet-card-see-pet-button", function (e) {
  e.preventDefault();
  const value = e.currentTarget.value;
  window.location.href = `../Detalhes/index.html?petId=${value}`
});

$(document).on("click", ".pet-card-favorite-pet-button", async function (e) {
  e.preventDefault();
  const value = e.currentTarget.value;
  await handleFavoritePet(value);
});