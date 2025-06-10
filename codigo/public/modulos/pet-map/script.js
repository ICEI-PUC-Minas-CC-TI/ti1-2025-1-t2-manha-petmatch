import {PetInterface} from "../../db-interface/pet-interface.js"
import {AnimalTypeInterface} from  "../../db-interface/animal-type-interface.js"
import {FavoritePetInterface} from '../../db-interface/favorite-pet-interface.js'
import {AddressInterface} from '../../db-interface/address-interface.js'
import { VerifyImage } from "../../utils/verify-image.js"

const petInterface = new PetInterface();
const animalTypeInterface = new AnimalTypeInterface();
const favoritePetInterface = new FavoritePetInterface();
const addressInterface = new AddressInterface() 

mapboxgl.accessToken = 'pk.eyJ1IjoicGVkcm9pdGFsbyIsImEiOiJjbWI2cmFidnAwMms5MmpvaGlnbGR6anhqIn0.xUp4xQ1ncpQf8G_5pabccw';


let animalTypeList = []
let petsList = []
let favoritedPetsList = []
let petAddressesList = []
let searchBarValue = ''

let petMarkes = []
let selectedAside = 'pets' // 'pets' | 'favorited' 

let currentPosition = [-44.192577, -19.945789]

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {

          currentPosition = [position.coords.longitude, position.coords.latitude]
        },
        function(error) {
            console.error("Erro ao obter localização: ", error);
        }
    );
} else {
    console.error("Geolocalização não é suportada pelo navegador.");
}


const map = new mapboxgl.Map({
        container: 'map',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: currentPosition,
        zoom: 10
});



function splitSearchParamsWords(search) {
  if(!search) {
    return []
  } else {
    return search.split(" ")
  }
}

function drawElements(listOfPets) {
    $("#pet-card-list-container").empty();

    listOfPets.forEach(pet => {
        VerifyImage.doesImageExists(pet.img_urls[0], (doesImgExists) => {
            const petImg = doesImgExists ? pet.img_urls[0] : "../../assets/images/dog_phatom.png";

            $('#pet-card-list-container').append(`
                <li>
                    <button class="pet-list-btn" id="${pet.id}">
                        <img src="${petImg}" alt="Image of ${pet.name}">
                        <div class="petListCardContent">
                            <div><h3>${pet.name}</h3> <span>2 Anos</span></div>
                            <p>${pet.breed}</p>
                        </div>
                    </button>
                </li>
            `);
        });
    });
}

function drawFavoritedElements(listOfPets) {
    $("#pet-card-list-container").empty();

    const favoritedList = listOfPets.filter(pet => favoritedPetsList.some((fav) => {
    console.log(fav)
      return pet.id === fav.props.petId }))


    favoritedList.forEach(pet => {
        VerifyImage.doesImageExists(pet.img_urls[0], (doesImgExists) => {
            const petImg = doesImgExists ? pet.img_urls[0] : "../../assets/images/dog_phatom.png";

            $('#pet-card-list-container').append(`
                <li>
                    <button class="pet-list-btn" id="${pet.id}">
                        <img src="${petImg}" alt="Image of ${pet.name}">
                        <div class="petListCardContent">
                            <div><h3>${pet.name}</h3> <span>2 Anos</span></div>
                            <p>${pet.breed}</p>
                        </div>
                    </button>
                </li>
            `);
        });
    });
}

function drawPinsOnMap(pets, addresses) {
  petMarkes.forEach(marker => marker.remove());

  const features = pets.map(pet => {
    const address = addresses.find(addr => addr.props.entityId === pet.id);
    if (!address) return null;

    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [address.props.longitude, address.props.latitude]
      },
      properties: {
        message: pet.name,
        imageId: pet.id,
        iconSize: [60, 60],
        imgUrl: pet.img_urls[0],
        pet: pet
      }
    };
  }).filter(Boolean); // remove nulls

  const geojson = {
    type: 'FeatureCollection',
    features: features
  };

  for (const feature of geojson.features) {
    const el = document.createElement('div');
    const { iconSize, imgUrl, pet } = feature.properties;
    const width = iconSize[0];
    const height = iconSize[1];

    el.className = 'marker';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.border = `1px solid yellow`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundColor = '#fff';
    el.onclick = () => handleDrawCard(pet.id);

    VerifyImage.doesImageExists(imgUrl, (exists) => {
      el.style.backgroundImage = exists
        ? `url("${imgUrl}")`
        : `url("../../assets/images/dog_phatom.png")`;
    });

    el.addEventListener('mouseover', () => {
      alert(pet.name);
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .addTo(map);

    petMarkes.push(marker);
  }
}


function handleDrawCard(id) {
  handleClosePetCard()
  const pet = petsList.find((pet) => pet.id === id)

  VerifyImage.doesImageExists(pet.img_urls[0], (doesImgExists) => {
    
  const petImg = doesImgExists ? `${pet.img_urls[0]}` : "../../assets/images/dog_phatom.png"

    $('#mainContainer').append(`
       <div class="pet-card">
              <button id="closeCard">
                <i class="material-icons">close</i>
              </button>
              <img src="${petImg}" alt="">
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
  })
  
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
        const {addresses} = await addressInterface.fetchPetsAddresses();
        
        petsList = pets;
        favoritedPetsList = favoritePets;

        console.log(petsList, favoritedPetsList)
        petAddressesList = addresses;

      switch(selectedAside) {
        case 'pets': 
          drawElements(pets)
        break;
        case 'favorite':
          drawFavoritedElements(pets)
        break;
      } 

        drawPinsOnMap(pets, petAddressesList)
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
     selectedAside = e.currentTarget.id;
    
    $(".asideButtonSelected").removeClass('asideButtonSelected')

    $(`#${selectedAside}`).addClass('asideButtonSelected')

    $('#dinamic_aside').show();
    $('#toggle-aside-close').attr('id', 'toggle-aside-open'); 


    switch(selectedAside) {
      case 'pets': 
        $('.search').show()

        $('#petListContainer').html(`
                    <h2>Pets</h2>

                    <ul id="pet-card-list-container" class="petList">
                 
                    </ul>
        `);
        drawElements(petsList)

      break;
      case 'favorite':
         $('.search').show()

         $('#petListContainer').html(`
              
                    <h2>Pets</h2>

                    <ul id="pet-card-list-container" class="petList">
                 
                    </ul>
        `);

        drawFavoritedElements(petsList)

      break;

      $('.search').hide()
       $('#petListContainer').html(`
                    <h2>Pets</h2>

                    <ul id="pet-card-list-container" class="petList">
                 
                    </ul>
                
        `);
      ;
    }
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


