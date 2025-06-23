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

async function handleAdoptionDecision(adoptionId, isApproved) {
    try {

        if(isApproved) {
            await adoptionInterface.approveAdoptionRequest({
                adoptionId,
                donorId: session.donorId
            })
        } else {
            await adoptionInterface.rejectAdoptionRequest({
                adoptionId,
                donorId: session.donorId
            })
        }
        
        $(`[data-id="${adoptionId}"]`).closest('li').fadeOut(300, function () {
            $(this).remove();
        });

        console.log(`Adoção ${isApproved ? 'aprovada' : 'rejeitada'}: ${adoptionId}`);
    } catch (error) {
        console.error('Erro ao processar decisão:', error);
        alert('Ocorreu um erro. Tente novamente.');
    }
}


async function fetchRequestAdoption() { 
    try {
        const adoptionResponse = await adoptionInterface.fetchAdoptionByDonorId({ donorId: session.donorId });

        const requestHtmlList = await Promise.all(
            adoptionResponse.adoptions.map(async req => {
                const { pet } = await petInterface.getPetById({ id: req.props.petId });
                const { user } = await userInterface.getUserById({ id: req.props.userId });

                return `
                <li>
                    <img src="${user.props.imgUrl}" alt="Adotante" class="request-img">
                    <img src="${pet.pet.props.imgUrls[0]}" alt="Pet" class="request-img">
                    <div class="request-info">
                        <strong>${pet.pet.props.name}</strong>
                        <span>Pedido de adoção por ${user.props.name}</span>
                    </div>
                    <div class="request-buttons">
                        <button class="approve" data-id="${req._id}">Aprovar</button>
                        <button class="reject" data-id="${req._id}">Rejeitar</button>
                    </div>
                </li>
                `;
            })
        );

        $('#request-list').html(requestHtmlList.join(''));

    } catch (error) {
        console.error(error);
    }
}

async function fetchAdoptions() {
    try {
        const petResponse = await petInterface.fetchAllPets()
        const adoptionResponse = await adoptionInterface.fetchAdoptionByUserId({userId: session.userId})
       
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

async function fetchAdoptionsDonor() {
    try {
        const petResponse = await petInterface.fetchAllPets()
       
        const petsAdopted = petResponse.pets.filter(pet => {
            return pet.props.donorId === session.donorId
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

    elements += session.donorId ? `
        <li>
            <img src="${pet.props.imgUrls[0]}" alt="PetProfile" class="pet-img">
            <div class="pet-info">
                <p class="pet-name">${pet.props.name}</p>
                <p class="pet-breed">${pet.props.breed[0]}</p>
            </div>
            <div style="display: flex; align-items: center">
            <button class="editBtn" value="${pet._id}">Editar</button>
            <button class="deleteBtn" value="${pet._id}"><i value="${pet._id}" class="material-icons">delete</i></button>
            </div>
        </li>    
    ` : `
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
    if(session.donorId) {
        await fetchAdoptionsDonor()
    }else {
        await fetchAdoptions()
    }
    await fetchRequestAdoption()
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

$('#pets-content').on('click', '.deleteBtn', async function (event) {
    const button = $(event.target).closest('.deleteBtn');
    const petId = button.val();

    try {
        await petInterface.deletePet({ petId });

        // Remove o <li> mais próximo desse botão
        button.closest('li').fadeOut(300, function () {
            $(this).remove();
        });

        console.log(`Pet ${petId} excluído com sucesso.`);
    } catch (error) {
        console.error('Erro ao excluir pet:', error);
        alert('Erro ao excluir o pet. Tente novamente.');
    }
});

$('#pets-content').on('click', '.editBtn', async function (event) {
    window.location.href = `${window.location.origin}/modulos/editar-pets/editar.html?petId=${event.target.value}`
});

    $('#request-list').on('click', '.approve', function () {
        const adoptionId = $(this).data('id');
        handleAdoptionDecision(adoptionId, true);
    });

    $('#request-list').on('click', '.reject', function () {
        const adoptionId = $(this).data('id');
        handleAdoptionDecision(adoptionId, false);
    });

});


if(session.donorId) {
$('#request-btn').show()    
}


$('#request-btn').click(async function () {
    $('#request-modal').css("display", "flex").hide().fadeIn();
});

$('#close-request-modal').click(function () {
    $('#request-modal').fadeOut();
});
