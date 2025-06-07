import {PetInterface} from "../../db-interface/pet-interface.js"
import {AnimalTypeInterface} from  "../../db-interface/animal-type-interface.js"
import {FavoritePetInterface} from '../../db-interface/favorite-pet-interface.js'

const petInterface = new PetInterface();
const animalTypeInterface = new AnimalTypeInterface();
const favoritePetInterface = new FavoritePetInterface();

let animalTypeList = []
let petsList = []
let searchBarValue = ''



function splitSearchParamsWords(search) {
  if(!search) {
    return []
  } else {
    return search.split(" ")
  }
}


function drawElements(listOfPets) {
        $("#pet-card-list-container").empty()
          listOfPets.forEach(pet => {

              console.log(pet)
              $('#pet-card-list-container').append(`
                  <li>
                     <button class="pet-list-btn" id="${pet.id}">
                          <img src="${pet.img_urls[0]}" alt="Image of  ${pet.name}">
                          <div class="petListCardContent">
                              <div><h3>${pet.name}</h3> <span>2 Anos</span></div>
                              <p>${pet.breed}</p>
                          </div>
                      </button>
                  </li>
              `)
        });

}

function handleDrawCard(id) {
  handleClosePetCard()
  const pet = petsList.find((pet) => pet.id === id)

  $('#mainContainer').append(`
       <div class="pet-card">
              <button id="closeCard">
                <i class="material-icons">close</i>
              </button>
              <img src="${pet.img_urls[0]}" alt="">
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
                    <button class="pet-card-favorite-pet-button " value="${pet.id}" id="favorite-${pet.id}"><i class="material-icons" style="color: white;">favorite</i></button>
                  </div>
                </div>
        </div>
    `)
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
        const searchValues = splitSearchParamsWords(search) 
        const {pets} = await petInterface.fetchPetsBySearch({search: searchValues});
        const {favoritePets} = await favoritePetInterface.fetchFavoritePet({userId: "userTestId"});

        petsList = pets

        drawElements(pets, favoritePets)
    }catch(err) {
        console.error(err)
    }
}

function handleClosePetCard() {
        $('.pet-card').remove();
}

function openDinamicBar() {
        $('#dinamic_aside').show();
        $('#toggle-aside-close').attr('id', 'toggle-aside-open'); 
}

function closeDinamicBar() {
        $('#dinamic_aside').hide();
        $('#toggle-aside-open').attr('id', 'toggle-aside-close');
}

function handleToggleDinamicBar() {
    if($('.toggle-aside').attr('id') == 'toggle-aside-open') {
       closeDinamicBar()
    } else {
       openDinamicBar()
    }
}

function handleClickAsideButton(e) {
     const elementId = e.currentTarget.id;
    
     console.log(elementId)
    $(".asideButtonSelected").removeClass('asideButtonSelected')

    $(`#${elementId}`).addClass('asideButtonSelected')
}

function goBack() {
    window.location = document.referrer
}

$(document).ready(async () => {
    await fetchPets(searchBarValue)
})
$('.toggle-aside').click(handleToggleDinamicBar)
$(".mainAsideButton").click(handleClickAsideButton);
$("#go-back-button").click(goBack)

$("#searchBar").on("propertychange input", onSearchBar)

$("#searchButton").click(handleSeachButton)

$(document).on("click", ".pet-list-btn", function (e) {
  e.preventDefault();
  const petId = e.currentTarget.id;
  handleDrawCard(petId)
});

$(document).on("click", "#closeCard", handleClosePetCard);



































mapboxgl.accessToken = 'pk.eyJ1IjoicGVkcm9pdGFsbyIsImEiOiJjbWI2cmFidnAwMms5MmpvaGlnbGR6anhqIn0.xUp4xQ1ncpQf8G_5pabccw';
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Foo',
                    'imageId': 1011,
                    'iconSize': [60, 60]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-66.324462, -16.024695]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Bar',
                    'imageId': 870,
                    'iconSize': [50, 50]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-61.21582, -15.971891]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'message': 'Baz',
                    'imageId': 837,
                    'iconSize': [40, 40]
                },
                'geometry': {
                    'type': 'Point',
                    'coordinates': [-63.292236, -18.281518]
                }
            }
        ]
    };

    const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-65.017, -16.457],
        zoom: 5
    });

    // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundSize = '100%';

        el.addEventListener('click', () => {
            window.alert(marker.properties.message);
        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }