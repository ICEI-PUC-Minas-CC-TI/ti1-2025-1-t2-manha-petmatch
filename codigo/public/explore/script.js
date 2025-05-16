import {PetInterface} from "../../db-interface/pet-interface.js"
import {AnimalTypeInterface} from  "../../db-interface/animal-type-interface.js"

const petInterface = new PetInterface();
const animalTypeInterface = new AnimalTypeInterface();
const urlParams = new URL(window.location)

const searchParam = urlParams.searchParams.get('search');
let searchBarValue = searchParam ? searchParam : ''
let animalTypeList = []

function splitSearchParamsWords(search) {
  if(!search) {
    return []
  } else {
    return search.split(" ")
  }
}

async function handleSeachButton() {
  $("#pet-card-list-container").empty()
  verifySeachBarValue()
  await fetchPets(searchBarValue)
}

function onSearchBar(event) {
  searchBarValue = event.target.value;
}

function verifySeachBarValue() {
        animalTypeList.forEach(animalType => {
        if(animalType.props.type.toLowerCase() === searchBarValue.toLowerCase()) {
          searchBarValue = animalType._id;
        }
      })
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
    console.log(search)
    try {   
      $('#cachorro').empty()
        const searchValues = splitSearchParamsWords(search) 
        let response;

        response = await petInterface.fetchPetsBySearch({search: searchValues});
        const {pets} = response;

        const petsByType = separatePetsByType(pets)

        for(let type in petsByType) {
          petsByType[type].forEach(pet => {
            $('#pet-card-list-container').append(`
                <div class="pet-card-list-content">
                  <h3>${type}</h3>
                  <ul class="pet-card-list" id="${type}">       
                  </ul>
                </div>
            `)

           $(`#${type}`).append(` <li class="pet-card" id=${pet.id}>
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
                    <button class="pet-card-see-pet-button">Ver Pet</button> 
                    <button class="pet-card-favorite-pet-button"><i class="material-icons" style="color: white;">favorite</i></button>
                  </div>
                </div>
              </li>`
            );
          
        });
        }

        
    }catch(err) {
        console.error(err)
    }
}
window.addEventListener("load", async () => {
  $("#searchBar").val(searchBarValue);
  await fetchAnimalTypes()
  await fetchPets(searchBarValue)

})

$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)