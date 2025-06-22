import {UserInterface} from '../../db-interface/user-interface.js'
import {PetInterface} from '../../db-interface/pet-interface.js'
import {SessionInterface} from '../../db-interface/session-interface.js'
import {AdoptionInterface} from '../../db-interface/adoption-interface.js'
import {CurrentSession} from '../../utils/current-session.js'
import {DateElapsed} from '../../utils/date-elapsed.js'


const sessionInterface = new SessionInterface()
const session = new CurrentSession()
const userInterface = new UserInterface()
const petInterface = new PetInterface()
const adoptionInterface = new AdoptionInterface()

async function updateUserInfo({description,imgData,name,phoneNumber}) {
    await userInterface.editUser({
        description,
        imgData,
        name,
        phoneNumber,
        userId: session.userId
    })
}

async function fetchAdoptions() {
    try {
        const petResponse = await petInterface.fetchAllPets()
        const adoptionResponse = await adoptionInterface.fetchAdoptionByUserId({userId: session.userId})
       
  console.log({
            petResponse,
            adoptionResponse
        })
        const petsAdopted = petResponse.pets.filter(pet => {
            return adoptionResponse.adoptions.some(adoption => {
                return pet._id == adoption.props.petId
            })
        })

        renderPetList(petsAdopted)

    }catch(error) {
        console.error(error)
    }
}

function rediretToDonorPage(donorId) {
    window.location.href = `${window.location.origin}/modulos/donor-profile/index.html?donorId=${donorId}`;
}

function renderPetList(petList) {

    let elements = petList.length === 0 ? '<p id="not-pets-message">Você não adoutou nenhum pet</p>' : ''

    petList.forEach(pet => {

        console.log(pet)
        elements += `
                <li>
                    <img src="${pet.props.imgUrls[0]}" alt="PetProfile" class="pet-img">
                    <div class="pet-info">
                        <p class="pet-name">${pet.props.name}</p>
                        <p class="pet-breed">${pet.props.breed[0]}</p>
                    </div>
                     <button class="donorBtn" value="${pet.props.donorId}">Donor</button>
                </li>    
        `
    });

    $('#pets-content').html(elements);
}



function renderSessionData() {
    $('#name').text(session.currentUser.name);
    $('#description').text(session.currentUser.description ? session.currentUser.description : 'Sem descrição');
    $('#age').text(DateElapsed.getYearsPassed(session.currentUser.bornAt) + ' anos');
    $('#number').text(session.currentUser.phoneNumber ? session.currentUser.phoneNumber : 'Nenhum número');
    $('#user-img').attr('src', session.currentUser.imgUrl);
    console.log(session.currentUser)

}

$(document).ready(async function () {
    await fetchAdoptions()
    renderSessionData()

    $('#edit-btn').click(function () {
        $('#edit-modal').css("display", "flex").hide().fadeIn();
        $('#edit-name').val($('#name').text().trim());
        $('#edit-description').val($('#description').text().trim());
        $('#edit-phone').val($('#phoneNumber').text()?.trim() || '');
    });

    $('#cancel-button').click(function () {
        $('#edit-modal').fadeOut();
    });

    $('#save-button').click(async function () {
        const name = $('#edit-name').val();
        const description = $('#edit-description').val();
        const imgData = $('#edit-img')[0].files[0];
        const phoneNumber = $('#edit-phone').val();

        await updateUserInfo({
            description,
            imgData,
            name,
            phoneNumber
        })
        await sessionInterface.checkSession()
        renderSessionData()
        $('#edit-modal').fadeOut();
        
    });

    $('.donorBtn').click((event) => {
        rediretToDonorPage(event.target.value)
    })
});
